import React from 'react'
import './WeatherExtras.css';

export default function WeatherExtras({ data }) {
    return (
        <div className='extras-container'>
            <div className='extra-border '>
                <img className='image-size' src='/extras/sun.png' alt="Sun" />
                <div className='head-text'> UV-index </div>
                <div className='text-values'> {data.UV} </div>
            </div>
            <div className='extra-border'>
                <img className='image-size' src='/extras/humidity.png' alt="Humidity" />
                <div className='head-text'> Humidity </div>
                <div className='text-values'> {data.humidity}% </div>
            </div>
            <div className='extra-border'>
                <img className='image-size' src='/extras/wind.png' alt="Wind" />
                <div className='head-text'> Wind </div>
                <div className='text-values'> {data.windSpeed} km/h </div>
            </div>
            <div className='extra-border fkn-css'>
                <div className='set-rise-text'>
                    <span className='set-rise-text weight'>
                        Sunrise:
                    </span>
                    <span className='set-rise-text opacity'>
                        {" " + data.sunRise}
                    </span>
                </div>
                <img className='image-size' src='/extras/sunset.png' alt="Sunset/Sunrise" />
                <div className='set-rise-text'>
                    <span className='set-rise-text weight'>
                        Sunset:
                    </span>
                    <span className='set-rise-text opacity'>
                        {" " + data.sunSet}
                    </span>
                </div>
            </div>
        </div>
    )
}
