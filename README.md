# Weather App

A weather app powered by ReactJS using two weather APIs, [open weather map](https://openweathermap.org/api)(OWM) and [open meteo](https://open-meteo.com/en/docs)(OM). Open weather map costs money so this api was used to get the coordinats of a city so that open meteo can provide the data needed to display the weather.

### [Link to the weather app]()


### TODO

- [x] Analyze the JSON files from OWM and OM.
    - Data that that I need are: temp (min and max), apparent temp, weather code, precipitation probability, wind speed, UV-index, sunrise/sunset, day/night, and time 
- [x] [Draw up the UI of the weather display data](https://github.com/urostripunovic/weather-app/blob/main/public/Weather-App-UI.jpg). 
- [ ] Create functions that divide up the data.
    - [ ] Current weather
    - [ ] Weather by the hour
    - [ ] Weather of the current week
    - [ ] Mapping of icons (find icons)
    - [ ] Mapping of UV-index values
- [ ] Create WeatherPage component
    - [ ] CurrentWeather component
    - [ ] HourlyWeather component
    - [ ] DailyWeather component
- [ ] LandingPage component (could just be a search button idk yet)
    - Sends the city name into the WeatherPage component