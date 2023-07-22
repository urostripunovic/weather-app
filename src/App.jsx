import { useState } from "react";
import WeatherPage from "./WeatherPage"
import Search from "./Search";
import CityError from "./CityError";
import LoadingScreen from "./LoadingScreen";
import { getCity, getForecast } from "./weather";

function App() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isFetched, setFetched] = useState(false);

  const handleSearch = async (city) => {
    const name = city.label.split(',')[0];
    try {
      setLoading(true);

      const city_data = await getCity(name);
      const forecast_data = await getForecast(city_data);
      setFetched(true);
      setData(forecast_data);
      //console.log(forecast_data, data, isFetched);
    } catch (err) {
      setFetched(false);
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  //Hämta datan som skall in i weather page som ändras från search field, prop drilling.

  return (
    <>
      <>{/*Komponent för ett sök fält som är auto fill som skickas in i weather page*/}</>
      <Search onSearchChange={handleSearch} />
      {isFetched ? <WeatherPage data={data} /> : <CityError />}
      <>{/*Loading screen efter vi söker o bara skickar in */}</>
      {isLoading && <LoadingScreen />}
    </>
  )
}


export default App
