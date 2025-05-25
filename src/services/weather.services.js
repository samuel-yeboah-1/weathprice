import { weatherapiBaseURL } from "@/constants";

export const weatherService = {
    getCurrentWeather({ city }) {
        const currentWeatherEndpoint = `${weatherapiBaseURL}/current.json?key=${weatherapiApiKey}&q=${city}`

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
            enabled: !!city, // Only run query if city is provided
        })
    },
}