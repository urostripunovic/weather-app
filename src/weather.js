import axios from "axios"
import { ICON_MAP, FORECAST_MAP, dayOrNightCodes } from "./iconMap";

const API_KEY = import.meta.env.VITE_API_KEY;
const OWM_URL = import.meta.env.VITE_OPEN_WEATHER_MAP_URL;
const OM_URL = import.meta.env.VITE_OPEN_METEO_URL;
const REVERSE_GEO_URL = import.meta.env.VITE_REVERSE_GEO_URL;
const REVERSE_GEO_API_KEY = import.meta.env.VITE_API_KEY_REVERSE_GEO;

export async function getCurrentLocation (lonLat) {
    const {lon, lat} = lonLat
    try {
        const response = await axios.get(`${REVERSE_GEO_URL}`, {
            params: {
                lat: lat,
                lon: lon,
                apiKey: REVERSE_GEO_API_KEY,
            },
        }).catch(() => console.log("ett fel har uppståt"))
        const { data } = response;
        //console.log(data.results[0].city)
        return data.results[0].city;
    } catch (error) {
        throw new Error("Something went wrong with reversing the geolocation");
    }
}

export async function getCity(city) {
    try {
        const response_OWM = await axios.get(`${OWM_URL}`, {
            params: {
                q: city,
                APPID: API_KEY,
            },
        }).catch(() => console.log("ett fel har uppståt"))
        const { data } = response_OWM;
        return data;
    } catch (error) {
        throw new Error("Something went wrong with finding the city");
    }
}

export async function getForecast(data_OWM) {
    const { lon, lat } = data_OWM.coord;
    try {
        const response_OM = await axios.get(`${OM_URL}`, {
            params: {
                latitude: lat,
                longitude: lon
            },
        });
        const { data } = response_OM;
        return {
            current: parseCurrentWeather(data, data_OWM),
            hourly: parseHourlyWeather(data),
            daily: parseDailyWeather(data),
        };
    } catch (error) {
        throw new Error("Something went wrong with the coordinates");
    }
}

function parseCurrentWeather({ current_weather, daily, hourly }, data_OWM) {
    const {
        is_day,
        temperature,
        windspeed,
        weathercode,
    } = current_weather;

    const {
        uv_index: [currUv],
        apparent_temperature: [feelsLikeCurr]
    } = hourly;

    const {
        sunrise: [sunRise],
        sunset: [sunSet],
        temperature_2m_max: [day],
        temperature_2m_min: [night],
    } = daily;

    return {
        name: data_OWM.name,
        description: data_OWM.weather[0].main,
        iconCode: parseIcon(weathercode, is_day),
        forecastCode: parseForeCastIcon(weathercode, is_day),
        currentTemp: Math.round(temperature),
        day: Math.round(day),
        night: Math.round(night),
        feelsLike: Math.round(feelsLikeCurr),
        extras: {
            humidity: data_OWM.main.humidity,
            UV: parseUvIndex(currUv),
            windSpeed: Math.round(windspeed),
            sunRise: parseTime(sunRise * 1000),
            sunSet: parseTime(sunSet * 1000),
        },
    };
}

function parseHourlyWeather({ current_weather, hourly }) {

    const {
        time,
        weathercode,
        is_day,
        temperature_2m,
        precipitation_probability,
    } = hourly;

    const next24HoursData = time.map((time, index) => {
        return {
            time: parseTime(time * 1000),
            iconCode: parseIcon(weathercode[index], is_day[index]),
            temp: Math.round(temperature_2m[index]),
            prob: Math.round(precipitation_probability[index])
        }
    })

    const currentWeatherTime = parseTime(current_weather.time * 1000);
    const cutOffIndex = next24HoursData.findIndex(index => index.time === currentWeatherTime);
    return next24HoursData.slice(cutOffIndex + 1, cutOffIndex + 25);

}

function parseDailyWeather({ daily }) {

    const {
        precipitation_probability_max,
        weathercode,
        temperature_2m_max,
        temperature_2m_min,
    } = daily;

    return daily.time.map((time, index) => {
        return {
            weekday: parseDay(time * 1000),
            prob: precipitation_probability_max[index],
            iconCode: parseIcon(weathercode[index], 1),
            day: Math.round(temperature_2m_max[index]),
            night: Math.round(temperature_2m_min[index]),
        }
    })
}

function parseTime(time) {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) //GPT Brah
}

function parseDay(time) {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", { weekday: "long" });
}

function parseIcon(iconCode, is_day) {
    if (dayOrNightCodes.includes(iconCode)) return ICON_MAP.get(iconCode) + (is_day === 1 ? "-sun" : "-moon");
    return ICON_MAP.get(iconCode);
}

function parseForeCastIcon(iconCode, is_day) {
    if (dayOrNightCodes.includes(iconCode)) return FORECAST_MAP.get(iconCode) + (is_day === 1 ? "day" : "night");
    return FORECAST_MAP.get(iconCode);
}

function parseUvIndex(index) {
    if (index < 2) return "Low";
    else if (index < 6) return "Moderate";
    else if (index < 8) return "High";
    else if (index < 10) return "Very High";
    else return "Extremly High";
}