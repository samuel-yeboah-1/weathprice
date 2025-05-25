import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";

function HistoryWeather({ weatherData }) {
  const historyWeatherArr = weatherData?.forecast?.forecastday || [];

  // Function to format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if it's today or yesterday
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Function to get day of week
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>WEATHER HISTORY</CardDescription>
        <CardTitle className="text-lg">
          {historyWeatherArr.length}-Day Weather History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 space-y-3">
            {historyWeatherArr.length > 0 ? (
              historyWeatherArr.map((day, index) => (
                <div
                  key={day.date || index}
                  className="flex flex-row justify-between items-center p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  {/* Left side - Date and condition */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {formatDate(day.date)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getDayOfWeek(day.date)}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                      <img
                        src={day.day?.condition?.icon}
                        alt={day.day?.condition?.text || "weather icon"}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-sm text-muted-foreground max-w-24 truncate">
                        {day.day?.condition?.text}
                      </span>
                    </div>
                  </div>

                  {/* Right side - Temperatures and details */}
                  <div className="flex items-center gap-4">
                    {/* Temperature range */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm">
                          {Math.round(day.day?.maxtemp_c)}°
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{Math.round(day.day?.mintemp_c)}°
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Avg {Math.round(day.day?.avgtemp_c)}°C
                      </span>
                    </div>

                    {/* Precipitation */}
                    {day.day?.totalprecip_mm > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-blue-600 font-medium">
                          💧 {day.day.totalprecip_mm}mm
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {day.day.daily_chance_of_rain}%
                        </span>
                      </div>
                    )}

                 
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  No historical data available
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HistoryWeather;
