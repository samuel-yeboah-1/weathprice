import React from "react";
import WeatherContent from "@/components/WeatherContent";
import { CityProvider } from "@/contexts/CityContext";

function Weather() {
  return (
    <CityProvider>
      <WeatherContent />
    </CityProvider>
  );
}

export default Weather;
