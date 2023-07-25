import React from 'react'
import "./WeatherPage.css";
import CurrentWeather from './WeatherComponents/CurrentWeather';
import HourlyWeather from './WeatherComponents/HourlyWeather';

const WeatherPage = ({ data }) => {
    //console.log(data)

    const { current, hourly, daily } = data;

    return (
        <div>
            <CurrentWeather data={current} />
            <HourlyWeather data={hourly} />
        </div>
    );
};

export default WeatherPage;

