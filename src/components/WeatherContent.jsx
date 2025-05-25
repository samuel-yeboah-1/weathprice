import CurrentWeather from "./CurrentWeather";
import React, { useState, useEffect } from "react";
import { useCityContext } from "@/contexts/CityContext";
import { weatherService } from "@/services/weather.services";
import { Spinner } from "./ui/spinner";
import CitySkeleton from "./ui/CitySkeleton";
import { useDebounce } from "@/hooks/useDebounce";

function WeatherContent() {
  const { setSelectedCity, selectedCity } = useCityContext();
  const [inputCity, setInputCity] = useState("");
  const debouncedCity = useDebounce(inputCity, 1000);

  const {
    data: currentWeather,
    error: currentWeatherError,
    isError: isCurrentWeatherError,
    isLoading: isLoadingCurrentWeather,
  } = weatherService.getCurrentWeather("accra");

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
      <Card className="bg-background">
        {renderCurrentWeatherError()}
        {isCurrentWeatherLoading ? (
          <CitySkeleton />
        ) : currentWeather ? (
          <CurrentWeather weatherData={currentWeather} />
        ) : null}
      </Card>
    </div>
  );
}

export default WeatherContent;
