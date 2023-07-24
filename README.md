# Weather App

A weather app powered by ReactJS using two weather APIs, [open weather map](https://openweathermap.org/api)(OWM) and [open meteo](https://open-meteo.com/en/docs)(OM). Open weather map only provides a weekly forecast so this api was used to get the coordinats of a city so that will then act as an input for open meteo that provides the data needed to display the weather.

### [Link to the weather app]()


### TODO

- [x] Analyze the JSON files from OWM and OM.
    - Data that that I need are: temp (min and max), apparent temp, weather code, precipitation probability, wind speed, UV-index, sunrise/sunset, day/night, and time 
- [x] [Draw up the UI of the weather display data](https://github.com/urostripunovic/weather-app/blob/main/public/Weather-App-UI.jpg). 
- [x] Create functions that divide up the data.
    - [x] Current weather
    - [x] Weather by the hour
    - [x] Weather of the week
    - [x] Mapping of icons (find icons)
    - [x] Mapping of UV-index values
- [x] Create a loading function
- [x] Create an error handler
- [ ] Create WeatherPage component
    - [ ] CurrentWeather component
    - [ ] HourlyWeather component
    - [ ] DailyWeather component
- [x] LandingPage component (could just be a search button idk yet)
    - [x] Lets one choose their current gps location or has a "auto" complete feature with every city that exists.
        - I used something called [react-select-async-paginate](https://www.npmjs.com/package/react-select-async-paginate). I wanted to try and work with already existing components to see how well I would do and my conclusion is that sometimes it's easier to reinvent the wheel. The search bar gave one error I couldn't really solve. Sometimes it works and sometimes it doesn't I don't know really.
    - [x] Sends the city name into the WeatherPage component


#### BUGS
- Tried to add a cool transtion for everytime someone wants to search up the forecast but whenever I do there is this small bug of the search bar going up to the top and doesn't have a fixed position after it has transitioned to the top. **[This linked helped with solving the issue](https://thoughtbot.com/blog/positioning#position) instead of using margins as the article suggest I instead opted to use `transform: translateX(-50%);` but this introduced a new issue of other contents being confined to a smaller space, I found [this](https://stackoverflow.com/questions/41033245/does-position-absolute-conflict-with-flexbox) instead and solved the issue**