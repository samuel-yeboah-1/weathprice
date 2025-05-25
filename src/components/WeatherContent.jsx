import React from "react";
import CurrentWeather from "./CurrentWeather";
import { weatherService } from "@/services/weather.services";


function WeatherContent() {
  const {
    data: currentWeather,
    error: currentWeatherError,
    isError: isCurrentWeatherError,
    isLoading: isLoadingCurrentWeather,
  } = weatherService.getCurrentWeather("accra");


  return (
    <div>
      <CurrentWeather weatherData={currentWeather} />
    </div>
  );
}

export default WeatherContent;
