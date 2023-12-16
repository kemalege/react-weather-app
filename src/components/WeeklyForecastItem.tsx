import { useWeatherContext } from '../context/WeatherContext';
import { getDate, getDayMonth } from '../utils/getDate';

const WeeklyForecastItem = () => {
  const { weatherData } = useWeatherContext();

  return (
    <div className="weather-box-wrapper">
        {weatherData?.map((data, index) => (
            <div className={`weather-box ${index === 0 ? 'current-day' : ''}`} key={index}>
                <div className="date-icon">
                    <div>
                        <p className="day-name">{getDate(data.dt)}</p>
                        <p className="day-month">{getDayMonth(data.dt)}</p>
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div className="temprature-box">
                        <p>{Math.round(data.temp.day)}</p>
                        <p className="night-temp">/{Math.round(data.temp.night)}°</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default WeeklyForecastItem