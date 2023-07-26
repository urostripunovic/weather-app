import React, { useRef, useState, useEffect } from 'react'
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
        const clientX = e.clientX ? e.clientX : (e.touches && e.touches.length > 0 ? e.touches[0].clientX : 0); //solve the error of having the touches throw erros
        const x = clientX - slider.current.offsetLeft;
        const scroll = (x - startX) * scrollSpeed;
        slider.current.scrollLeft = scrollLeft - scroll;
    }

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchmove', handleDrag);
        document.addEventListener('touchend', handleDragEnd);

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleDrag);
            document.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging]);

    return (
        <div
            ref={slider}
            className='hour-border'
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
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
                            <img className='tear-drop' src='/tear-drop.png' />
                            {forecast.prob}%
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
