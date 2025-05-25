import React from "react";

function CurrentWeather({ weatherData }) {
  
  const name = weatherData?.location?.name;
  const temp_c = weatherData?.current?.temp_c;
  const text = weatherData?.current?.condition?.text;
  const icon = weatherData?.current?.condition?.icon;
  
  return (
    <div className="p-2 ">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <h1 className="text-5xl font-bold mb-2">{temp_c}°C</h1>
        <h4 className="text-gray-500 mb-4">{text}</h4>
        {icon && (
          <div>
            <img src={icon} alt="weather-icon" className="w-12 h-12" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentWeather;