import React from 'react'
import './CurrentWeather.css';

export default function CurrentWeather({ data }) {
    //console.log(data);
    return (
        <div className={`curr-border image-${data.forecastCode}`}>
            <div className='curr-img-container'>
                <span className='currentTemp'>
                    {data.currentTemp}°
                </span>
                <span>
                    <img
                        className="picture"
                        src={`/icons/${data.iconCode}.png`}
                        alt="weather"
                    />
                </span>
            </div>

            <div className='desc'>
                {data.description}
            </div>

            <div className='city-name'>
                {data.name}
            </div>

            <div className='day-night'>
                Day {data.day}° • Night {data.night}° feels like {data.feelsLike}°
            </div>

        </div>
    )
}
