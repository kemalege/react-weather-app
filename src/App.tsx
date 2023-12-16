import React from "react";
import WeatherContextProvider from "./context/WeatherContext";
import WeeklyForecast from "./components/WeeklyForecast";

function App() {
  return (
      <WeatherContextProvider>
        <WeeklyForecast/>
      </WeatherContextProvider>
  );
}

export default App;
