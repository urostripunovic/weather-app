# Weather App

A weather app powered by ReactJS using two weather APIs, [Open Weather Map](https://openweathermap.org/api) (OWM) and [Open Meteo](https://open-meteo.com/en/docs) (OM). Open weather map only provides a weekly forecast so this api was used to get the coordinats of a city so that will then act as an input for open meteo that provides the data needed to display the weather. [GeoDB](https://rapidapi.com/wirefreethought/api/geodb-cities/) was used to create a list of city names where not all of them exist in OWM.

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

### COULD BE TODO's
- [ ] Create dark mode for the page if it is night **prep is already done**
- [x] Only update the component if it's a new city. **Thought it was going to be harder than expected, I tried using ref and memo but all that was required was just to see if `data.current.name` was the same as the search field if it was then just return, no need for fancy solutions when a simple line like this `if (data && (data.current.name === name)) return;` was enough.**

#### BUGS
- Tried to add a cool transtion for everytime someone wants to search up the forecast but whenever I do there is this small bug of the search bar going up to the top and doesn't have a fixed position after it has transitioned to the top. **[This linked helped with solving the issue](https://thoughtbot.com/blog/positioning#position) instead of using margins as the article suggest I instead opted to use `transform: translateX(-50%);` but this introduced a new bug of other contents being confined to a smaller space, I found [this](https://stackoverflow.com/questions/41033245/does-position-absolute-conflict-with-flexbox) which solved the issue**
- Duplicate names in the search bar. **Solved by removing them, how? Well create a set from the values and then just remove the ones with already existing names.**