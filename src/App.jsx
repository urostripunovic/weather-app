import WeatherPage from "./WeatherPage"
import { getWeather } from "./weather";

function App() {

  async function displayData() {
    const test = await getWeather("malmö");
    console.log(test);
  }

  return (
    <>
      <button onClick={() => displayData()}> TEST </button>
      <WeatherPage />
    </>
  )
}


export default App
