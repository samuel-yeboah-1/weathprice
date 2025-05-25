import { useQuery } from "@tanstack/react-query"
import { COINGECKO_API_URL } from "@/constants"
import { formatPriceData } from "@/helpers";

export const coinsService = {
    async getHistoricalData(coinId, days = 7) {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`, {
                method: 'GET',
                headers: {
                    'x-cg-demo-api-key': coingeckoApiKey
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch crypto historical data")
            }
            const data = await res.json();
            return data.prices.map(([timestamp, price]) => ({
                timestamp: new Date(timestamp),
                price
            }));
        } catch (error) {
            throw new CryptoError(
                'Failed to fetch historical data: ' + error.message,
                'FETCH_ERROR'
            );
        }
    },

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