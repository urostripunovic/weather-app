import React from 'react'
import "./WeatherPage.css";
import CurrentWeather from './WeatherComponents/CurrentWeather';
import HourlyWeather from './WeatherComponents/HourlyWeather';
import DailyWeather from './WeatherComponents/DailyWeather';

const WeatherPage = ({ data }) => {
    console.log(data)

    const { current, hourly, daily } = data;

    return (
        <div>
            <CurrentWeather data={current} />
            <HourlyWeather data={hourly} />
            <DailyWeather data={daily} />
            {/*Sista kvar sen css*/}
        </div>
    );
};

export default WeatherPage;

