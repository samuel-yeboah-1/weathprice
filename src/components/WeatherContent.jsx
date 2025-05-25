import { weatherService } from "@/services/weather.services";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";

import { useCityContext } from "@/contexts/CityContext";
import { useDebounce } from "@/hooks/useDebounce";
import { Card } from "@/components/ui/card";
import CitySkeleton from "@/components/ui/CitySkeleton";
import CurrentWeather from "@/components/CurrentWeather";
import { Spinner } from "@/components/ui/spinner";
import HourWeatherCard from "./HourWeatherCard";
import HistoryWeather from "./HistoryWeather";

// Create a separate component that uses the context
export default function WeatherContent() {
  const { setSelectedCity, selectedCity } = useCityContext();
  const [inputCity, setInputCity] = useState("");
  const debouncedCity = useDebounce(inputCity, 1000);

  const {
    data: currentWeather,
    isError: isCurrentWeatherError,
    isLoading: isCurrentWeatherLoading,
    error: currentWeatherError,
  } = weatherService.getCurrentWeather({ city: selectedCity });

  const {
    data: past24HrWeather,
    isError: isPast24HrWeatherError,
    isLoading: isPast24HrWeatherLoading,
    error: past24HrWWeatherError,
  } = weatherService.getPast24HrWeather({ city: selectedCity });

  const {
    data: historyWeather,
    isError: isHistoryWeatherError,
    isLoading: isHistoryWeatherLoading,
    error: historyWeatherError,
  } = weatherService.getHistoryWeather({ city: selectedCity,days:10 });

  // Update selected city when debounced input changes
  useEffect(() => {
    if (debouncedCity.trim()) {
      setSelectedCity(debouncedCity);
    }
  }, [debouncedCity, setSelectedCity]);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setInputCity(value);
  };

  const renderCurrentWeatherError = () => {
    if (!isCurrentWeatherError) return null;

    if (currentWeatherError?.code === "404") {
      return (
        <div className="p-4 text-red-500">
          City not found. Please check the spelling and try again.
        </div>
      );
    }

    return (
      <div className="p-4 text-red-500">
        Error loading current weather data: {currentWeatherError?.message}
      </div>
    );
  };

  const renderPast24HrError = () => {
    if (!isPast24HrWeatherError) return null;

    return (
      <div className="p-4 text-red-500">
        Error loading past 24hr weather data: {past24HrWWeatherError?.message}
      </div>
    );
  };

  const renderHistoryWeatherError = () => {
    if (!isHistoryWeatherError) return null;

    return (
      <div className="p-4 text-red-500">
        Error loading past weather data: {historyWeatherError?.message}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Weather</h1>
        <div className="relative max-w-[200px]">
          <Input
            type="text"
            placeholder="Enter city name"
            value={inputCity}
            onChange={handleCityChange}
            className="pr-8"
          />
          {(isCurrentWeatherLoading || isPast24HrWeatherLoading) && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Spinner size="sm" />
            </div>
          )}
        </div>
      </div>

      {/* Current Weather Card */}
      <Card className="bg-background" >
        {renderCurrentWeatherError()}
        {isCurrentWeatherLoading ? (
          <CitySkeleton />
        ) : currentWeather ? (
          <CurrentWeather weatherData={currentWeather} />
        ) : null}
      </Card>

      {/* Past 24Hr Weather Card */}
    
        {renderPast24HrError()}
        {isPast24HrWeatherLoading ? (
          <CitySkeleton />
        ) : past24HrWeather ? (
          <HourWeatherCard weatherData={past24HrWeather} />
        ) : null}
     
      {/*History Weather Card */}
      <div className="bg-background">
        {renderHistoryWeatherError()}
        {isHistoryWeatherLoading ? (
          <CitySkeleton />
        ) : past24HrWeather ? (
          <HistoryWeather weatherData={historyWeather} />
        ) : null}
      </div>
    </div>
  );
}
