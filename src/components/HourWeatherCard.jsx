import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";

function HourWeatherCard({ weatherData }) {
  const { name, localtime } = weatherData?.location || {};
  const hour = weatherData?.forecast?.forecastday?.[0]?.hour || [];

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const formatDate = (localtime) => {
    if (!localtime) return "";
    const date = new Date(localtime);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-full md:max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <CardDescription className="text-xs sm:text-sm">
          Weather summary card for the past 24 hours
        </CardDescription>
        <CardTitle className="text-base sm:text-lg md:text-xl leading-tight">
          {name
            ? `24 hour weather summary for ${name}`
            : "24 hour weather summary"}
        </CardTitle>
        {localtime && (
          <p className="text-xs sm:text-sm text-muted-foreground">
            {formatDate(localtime)}
          </p>
        )}
      </CardHeader>

      <CardContent className="p-3 sm:p-5 md:p-6">
        <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent pr-1">
          <div className="flex flex-col gap-4">
            {hour.length > 0 ? (
              hour.map((pastHour, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors"
                >
                  <p className="text-sm sm:text-base font-medium min-w-[60px]">
                    {formatTime(pastHour?.time)}
                  </p>
                  <img
                    src={pastHour?.condition?.icon}
                    alt={pastHour?.condition?.text || "weather-icon"}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                  <p className="text-sm sm:text-base font-semibold">
                    {pastHour?.temp_c}°C
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-[200px]">
                    {pastHour?.condition?.text}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-8">
                <p className="text-sm text-muted-foreground">
                  No hourly data available
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HourWeatherCard;
