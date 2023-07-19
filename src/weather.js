import axios from "axios"
import { ICON_MAP, dayOrNightCodes } from "./iconMap";

const API_KEY = import.meta.env.VITE_API_KEY;
const OWM_URL = import.meta.env.VITE_OPEN_WEATHER_MAP_URL;
const OM_URL = import.meta.env.VITE_OPEN_METEO_URL;
//const city = "Malmö"

export async function getWeather(city) {
    try {
        const response_OWM = await axios.get(`${OWM_URL}`, {
            params: {
                q: city,
                APPID: API_KEY,
            },
        });
        const { data } = response_OWM;
        const weatherForecast = await getForecast(data);
        //console.log("getWeather function: ", data)
        return weatherForecast;
    } catch (error) {
        throw new Error("Something went wrong with finding the city");
    }
}

async function getForecast(data_OMW) {
    const { lon, lat } = data_OMW.coord;
    try {
        const response_OM = await axios.get(`${OM_URL}`, {
            params: {
                latitude: lat,
                longitude: lon
            },
        });
        const { data } = response_OM;
        console.log("getForecast function ", data)
        return {
            current: parseCurrentWeather(data, data_OMW),
            hourly: parseHourlyWeather(data),
            //daily: parseDailyWeather(data),
        };
    } catch (error) {
        throw new Error("Something went wrong with the coordinates");
    }
}

function parseCurrentWeather({ current_weather, daily, hourly }, data_OMW) {
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
        name: data_OMW.name,
        description: data_OMW.weather[0].main,
        humidity: data_OMW.main.humidity,
        iconCode: parseIcon(weathercode, is_day),
        UV: parseUvIndex(currUv),
        currentTemp: Math.round(temperature),
        windSpeed: Math.round(windspeed),
        day: Math.round(day),
        night: Math.round(night),
        feelsLike: Math.round(feelsLikeCurr),
        sunRise: parseTime(sunRise * 1000),
        sunSet: parseTime(sunSet * 1000),
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

    const next24HoursData = time
        .map((time, index) => {
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

function parseDailyWeather({ current_weather, daily }) {

}

function parseTime(time) {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) //GPT Brah
}

function parseIcon(iconCode, is_day) {
    if (dayOrNightCodes.includes(iconCode))
        return ICON_MAP.get(iconCode) + (is_day === 1 ? "-sun" : "-moon");

    return ICON_MAP.get(iconCode);
}

function parseUvIndex(index) {
    if (index < 2)
        return "Low";
    else if (index < 6)
        return "Moderate";
    else if (index < 8)
        return "High";
    else if (index < 10)
        return "Very High";
    else
        return "Extremly High";
}