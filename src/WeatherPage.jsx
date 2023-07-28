import React from 'react'
import CurrentWeather from './WeatherComponents/CurrentWeather';
import HourlyWeather from './WeatherComponents/HourlyWeather';
import DailyWeather from './WeatherComponents/DailyWeather';
import "./WeatherPage.css";
import WeatherExtras from './WeatherComponents/WeatherExtras';

const WeatherPage = ({ data }) => {
    //console.log(data)

    const { current, hourly, daily } = data;

    return (
        <div>
            <CurrentWeather data={current} />
            <HourlyWeather data={hourly} />
            <DailyWeather data={daily} />
            <WeatherExtras data={current.extras} />
        </div>
    );
};

export default WeatherPage;

