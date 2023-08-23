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
- [x] Create WeatherPage component
    - [x] CurrentWeather component
        - add images representing the clouds. One for a clear sky, kinda cloudy sky, cloudy sky and night sky. **more images could be added but I've understood how to solve this kind of problem in the future.**
    - [x] HourlyWeather component
        - Create a ["carousel"](https://stackoverflow.com/questions/28576636/mouse-click-and-drag-instead-of-horizontal-scroll-bar-to-view-full-content-of-c) so that people are able to drag it to the left and right to see the comming 24hours. There is also a ready [package](https://github.com/Norserium/react-indiana-drag-scroll/blob/master/src/index.tsx) that exits as well but changed it to match my code.
    - [x] DailyWeather component
        - Just a small table of value showing, the weekly forecast.
    - [x] CurrentOtherStuff component
        - Showing the uv index and such.
- [x] LandingPage component (could just be a search button idk yet)
    - [x] Lets one choose their current gps location or has a "auto" complete feature with every city that exists.
        - I used something called [react-select-async-paginate](https://www.npmjs.com/package/react-select-async-paginate). I wanted to try and work with already existing components to see how well I would do and my conclusion is that sometimes it's easier to reinvent the wheel. The search bar gave one error I couldn't really solve. Sometimes it works and sometimes it doesn't I don't know really.
    - [x] Sends the city name into the WeatherPage component

### COULD BE TODO's
- [ ] ~~Create dark mode for the page if it is night **prep is already done**~~
- [ ] Create gradient dependent on the forecast image, change text color as well.
- [x] Only update the component if it's a new city. **Thought it was going to be harder than expected, I tried using ref and memo but all that was required was just to see if `data.current.name` was the same as the search field if it was then just return, no need for fancy solutions when a simple line like this `if (data && (data.current.name === name)) return;` was enough.**

#### BUGS
- Tried to add a cool transtion for everytime someone wants to search up the forecast but whenever I do there is this small bug of the search bar going up to the top and doesn't have a fixed position after it has transitioned to the top. **[This linked helped with solving the issue](https://thoughtbot.com/blog/positioning#position) instead of using margins as the article suggest I instead opted to use `transform: translateX(-50%);` but this introduced a new bug of other contents being confined to a smaller space, I found [this](https://stackoverflow.com/questions/41033245/does-position-absolute-conflict-with-flexbox) which solved the issue**
- Duplicate names in the search bar. **Solved by removing them, how? Well create a set from the values and then just remove the ones with already existing names.**
- I wanted to have the draggable hourly component to be across the document but it didn't work and the reason for it being so was because I only applied it to that div container. To solve this problem I would need to have have it be draggable across the **document** instead of only in the `<divclassName='hour-border'>`. This was done by adding event listener and having them be in a `useEffect`-hook while the draggin is on, and by doing so I get the desired effect + don't forget to remove the listeners!