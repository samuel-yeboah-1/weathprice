import React from "react";
import { weatherService } from "@/services/weather.services";

function Weather() {
  const { data, error, isError } = weatherService.getCurrentWeather("accra");
  console.log(data)
  return <div>Weather</div>;
}

export default Weather;
