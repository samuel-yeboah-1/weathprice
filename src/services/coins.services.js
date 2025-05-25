import { useQuery } from "@tanstack/react-query"
import { COINGECKO_API_URL } from "@/constants"

export const coinsService = {
    getCryptoPrices: ({ coins = ['bitcoin', 'ethereum'] }) => {
        return useQuery({
            queryKey: ['cryptoPrices', coins],
            queryFn: async () => {
                try {
                    const response = await fetch(
                        `${COINGECKO_API_URL}/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                    );

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error("Failed to fetch crypto prices : ", error);

                    }

                    const data = await response.json();
                    return formatPriceData(data);
                } catch (error) {
                    throw new Error("Failed to fetch crypto prices", error);
                }
            },

        });
    }
}