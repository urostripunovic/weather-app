import React from 'react'
import './DailyWeather.css'

export default function DailyWeather({ data }) {
    return (
        <div className='daily-border'>
            {data.map(((forecast, index) => {
                return (
                    <div className='daily-forecast' key={index}>
                        <span className='text-weight text-alligment flex-patch'>
                            {forecast.weekday}
                        </span>
                        <span className='text-alligment flex-patch'>
                            <img className='tear-drop-daily text-alligment' src='/tear-drop.png' />
                            {forecast.prob}%
                        </span>

                        <img
                            className='daily-img'
                            src={`/icons/${forecast.iconCode}.png`}
                            alt="weather"
                        />
                        <span className='text-weight text-alligment even-more-flex-patch'>
                            {forecast.day}° {forecast.night}°
                        </span>
                    </div>
                )
            }))}
        </div>
    )
}
