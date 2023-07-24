import { useState } from "react";
import WeatherPage from "./WeatherPage"
import Search from "./Search";
import CityError from "./CityError";
import LoadingScreen from "./LoadingScreen";
import { getCity, getForecast } from "./weather";
import "./App.css";

function App() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [cityError, setError] = useState(null);
  const [movedUp, setMovedUp] = useState(false);

  const handleSearch = async (city) => {
    const name = city.label.split(',')[0];
    try {
      setLoading(true);

      const city_data = await getCity(name);
      const forecast_data = await getForecast(city_data);
      setFetched(true);
      setData(forecast_data);
      setMovedUp(true);
      //console.log(forecast_data, data, isFetched);
    } catch (err) {
      setFetched(false);
      setError(true)
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  //Hämta datan som skall in i weather page som ändras från search field, prop drilling.

  return (
    <div className="parent-container">
      <div className={`container ${movedUp ? 'moved-up' : ''}`}>
        <Search onSearchChange={handleSearch} />
        <div className="content">
          {isLoading ? <LoadingScreen /> : isFetched ? <WeatherPage data={data} /> : cityError && <CityError />}
        </div>
      </div>
    </div>
  )
}


export default App
