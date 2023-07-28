import { useState, useEffect } from "react";
import WeatherPage from "./WeatherPage"
import Search from "./Search";
import CityError from "./CityError";
import LoadingScreen from "./LoadingScreen";
import { getCity, getForecast, getCurrentLocation } from "./weather";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [cityError, setError] = useState(null);

  /* Geolocation of the user or their current timezone */
  useEffect(() => {
    const start = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const city = start.split('/')[1]
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const lonLat = { lon: coords.longitude, lat: coords.latitude };
        const city = await getCurrentLocation(lonLat)
        fetchData(city)
      },
      () => fetchData(city));
  }, []);


  const handleSearch = async (city) => {
    const name = city.label.split(',')[0];
    if (data && (data.current.name === name)) return;
    fetchData(name)
  }

  const fetchData = async (city) => {
    try {
      setLoading(true);
      const city_data = await getCity(city);
      const forecast_data = await getForecast(city_data);
      setFetched(true);
      setData(forecast_data);
    } catch (err) {
      setFetched(false);
      setError(true)
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="parent-container">
      <div className='container'>
        <Search onSearchChange={handleSearch} />
        <div className="content">
          {isLoading ? <LoadingScreen /> : isFetched ? <WeatherPage data={data} /> : cityError && <CityError />}
        </div>
      </div>
    </div>
  )
}

export default App
