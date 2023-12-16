import React, { useEffect } from "react";
import "../styles/index.css";
import { useWeatherContext } from "../context/WeatherContext";
 
const SelectProvince = () => {

  const { setSelectedProvince } = useWeatherContext();
  
  const cities = [
    { label: "İzmir", lat: 38.423733, lon: 27.142826 },
    { label: "Denizli", lat: 37.783333, lon: 29.094715 },
    { label: "Ankara", lat: 39.925533, lon: 32.866287 },
    { label: "İstanbul", lat: 41.015137, lon: 28.97953 },
  ];

  useEffect(() => {
    setSelectedProvince(cities[0]);
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = cities.find( option => option.label === event.target.value)
    console.log(selectedOption);
    if(selectedOption)
      setSelectedProvince(selectedOption);
   };
   
  return (
    <div className="select-province-container">
      <select className="dropdown" onChange={handleSelectChange}>
        {cities.map((option) => (
          <option className="dropdown-content" key={option.label} value={option?.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectProvince;
