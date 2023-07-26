import React, { useRef, useState } from 'react'
import './HourlyWeather.css'

export default function HourlyWeather({ data }) {
    const slider = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleDragStart = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = e.clientX || e.touches[0].clientX; //desktop eller phone
        setStartX(clientX - slider.current.offsetLeft)
        setScrollLeft(slider.current.scrollLeft)
    }

    const handleDrag = (e) => {
        //Logik här
        if (!isDragging) return;
        const scrollSpeed = 1;
        const clientX = e.clientX || e.touches[0].clientX;
        const x = clientX - slider.current.offsetLeft;
        const scroll = (x - startX) * scrollSpeed;
        slider.current.scrollLeft = scrollLeft - scroll;
    }

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    return (
        <div
            ref={slider}
            className='hour-border'
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
        >
            {data.map((forecast, index) => {
                //console.log(forecast, index)
                return (
                    <div className='hour-forecast' key={index}>
                        {forecast.time}
                        <img
                            className='hour-img'
                            src={`/icons/${forecast.iconCode}.png`}
                            alt="weather" 
                        />
                        <div className='hour-temp'>
                            {forecast.temp}°
                        </div>
                        <div className='hour-prob'>
                            <img className='tear-drop' src='/tear-drop.png'/>
                            {forecast.prob}%
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
