# Weather App

A weather app powered by ReactJS using two weather APIs, [Open Weather Map](https://openweathermap.org/api) (OWM) and [Open Meteo](https://open-meteo.com/en/docs) (OM). Open weather map only provides a weekly forecast so this api was used to get the coordinats of a city so that will then act as an input for open meteo that provides the data needed to display the weather. [GeoDB](https://rapidapi.com/wirefreethought/api/geodb-cities/) was used to create a list of city names where not all of them exist in OWM. [Geoapify](https://www.geoapify.com/) was used to get the users current GPS location (with their permission ofcourse) and then reverse it to get the current city they are located in. [Here's the documentation if you want to read it](https://github.com/urostripunovic/weather-app/blob/main/DOCUMENTATION.md)

## [Link to the weather app](https://nice-local-weather.netlify.app/)
