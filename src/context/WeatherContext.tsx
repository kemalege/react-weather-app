/* eslint-disable */

import { createContext, useState, useEffect, useContext } from "react";
import useAxiosFetch, { ErrorResponse } from "../hooks/useAxiosFetch";
import { ICurrentWeatherData, IDailyWeatherDataList, IProvince } from "../types/type";

type WeatherContextProviderProps = {
  children?: React.ReactNode;
};

type WeatherContextType = {
  weatherData: IDailyWeatherDataList | null;
  currentWeatherData: ICurrentWeatherData | null;
  error: ErrorResponse | null | unknown;
  isLoading: boolean;
  selectedProvince:  IProvince | null;
  setSelectedProvince: React.Dispatch<React.SetStateAction<IProvince | null>>;
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherContextProvider({
  children,
}: WeatherContextProviderProps) {
  const API_KEY = import.meta.env.VITE_SECRET;
  const lang = navigator.language.split("-")[0];
  const [weatherData, setWeatherData] = useState<IDailyWeatherDataList | null>(null);
  const [currentWeatherData, setCurrentWeatherData] = useState<ICurrentWeatherData | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(null);


   const { data, error, isLoading } = useAxiosFetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedProvince?.lat}&lon=${selectedProvince?.lon}&appid=${API_KEY}&lang=${lang}&units=metric`
  );

  useEffect(() => {
    if(data){
      setWeatherData(data.daily);
      setCurrentWeatherData(data.current);
    }
  }, [data]);

  return (
    <WeatherContext.Provider
      value={{ weatherData, currentWeatherData, selectedProvince, setSelectedProvince, error, isLoading }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (context === null) {
    throw new Error(
      "useWeatherContext must be used within a WeatherContextProvider"
    );
  }
  return context;
}
