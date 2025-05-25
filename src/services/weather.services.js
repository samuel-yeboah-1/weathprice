import { weatherapiBaseURL } from "@/constants";
import { formatDate } from "@/helpers";
import { useQuery } from "@tanstack/react-query"

const weatherapiApiKey = import.meta.env.VITE_WEATHERAPI_API_KEY

export const weatherService = {
    getCurrentWeather({ city = 'accra' }) {
        const currentWeatherEndpoint = `${weatherapiBaseURL}/current.json?key=${weatherapiApiKey}&q=${city}`
        console.log(currentWeatherEndpoint)

        return useQuery({
            queryKey: ["currentWeather", city],
            queryFn: async () => {
                const res = await fetch(currentWeatherEndpoint);
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    const error = new Error("Failed to fetch current weather data");
                    error.code = res.status.toString();
                    error.details = errorData;
                    throw error;
                }
                const data = await res.json();
                return data;
            },
            enabled: !!city,
        })
    },

    getPast24HrWeather({ city }) {
        const today = new Date();
        const formattedDate = formatDate(today);
        const past24WeatherEndpoint = `${weatherapiBaseURL}/history.json?key=${weatherapiApiKey}&q=${city}&dt=${formattedDate}&end_dt=${formattedDate}`

        return useQuery({
            queryKey: ["past24HrWeather", city],
            queryFn: async () => {
                const res = await fetch(past24WeatherEndpoint);
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    const error = new Error("Failed to fetch past 24hr weather data");
                    error.code = res.status.toString();
                    error.details = errorData;
                    throw error;
                }
                const data = await res.json();
                return data;
            },
            enabled: !!city
        })

    }
}