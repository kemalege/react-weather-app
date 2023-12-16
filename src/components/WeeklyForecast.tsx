import { useWeatherContext } from "../context/WeatherContext";
import "../styles/index.css";
import SelectProvince from "./SelectProvince";
import WeeklyForecastItem from "./WeeklyForecastItem";

const WeeklyForecast = () => {
  const { isLoading } = useWeatherContext();
  
  return (
    <section className="container">
      <SelectProvince/>
        {isLoading ? <div className="loading"><p>Loading...</p></div> : 
          <>
            <WeeklyForecastItem/> 
          </>}
    </section>
  );
};

export default WeeklyForecast;
