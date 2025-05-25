// city-context.js
import { useState, useContext, createContext, useEffect } from "react";

// 1. Create context with no default value (undefined to catch misuse)
const CityContext = createContext(undefined);

// 2. Provider component - ensure consistent naming and export
export const CityProvider = ({ children, defaultCity = "accra" }) => {
  const [selectedCity, setInternalSelectedCity] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("city")) || defaultCity;
    } catch {
      return defaultCity;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setSelectedCity = (city) => {
    if (!city || typeof city !== "string") {
      setError("Invalid city name");
      return;
    }

    const sanitized = city.trim().replace(/[^a-zA-Z\s-]/g, "");
    if (sanitized) {
      setInternalSelectedCity(sanitized);
    } else {
      setError("Please enter a valid city name");
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("city", JSON.stringify(selectedCity));
      setError(null);
    } catch (e) {
      console.error("Failed to save city", e);
      setError("Failed to save city selection");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCity]);

  const value = {
    selectedCity,
    setSelectedCity,
    isLoading,
    error,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

// 3. Custom hook - ensure consistent export
export const useCityContext = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCityContext must be used inside a CityProvider");
  }
  return context;
};