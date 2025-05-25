import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";
import { useCryptoContext } from "@/contexts/PriceContext";
export function CoinCard({ prices, isLoading }) {
  const { selectedCoin, error } = useCryptoContext();

  if (isLoading) {
    return (
      <Card className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 rounded-lg bg-red-100 dark:bg-red-900">
        <p className="text-red-600 dark:text-red-300">{error}</p>
      </Card>
    );
  }

  return (
    <Card
      className={`
        ${prices?.[selectedCoin] ? "border-green-500" : "border-gray-200"}
        transition-colors duration-200
        ${isLoading ? "animate-pulse" : ""}
      `}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>{selectedCoin === "bitcoin" ? "Bitcoin" : "Ethereum"}</span>
            {isLoading && <Spinner />}
          </div>
          <span className="text-sm font-normal text-gray-500">
            {selectedCoin === "bitcoin" ? "BTC" : "ETH"}/USD
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!prices?.[selectedCoin] ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-bold">
                $
                {prices[selectedCoin]?.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span
                className={`text-sm font-semibold ${
                  prices[selectedCoin]?.priceChange24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {prices[selectedCoin]?.priceChange24h >= 0 ? "↑" : "↓"}
                {Math.abs(prices[selectedCoin]?.priceChange24h).toFixed(2)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-500">24h Volume</p>
                <p className="font-medium">
                  $
                  {prices[selectedCoin]?.volume24h?.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {prices[selectedCoin]?.lastUpdate?.toLocaleTimeString()}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg col-span-2">
                <p className="text-sm text-gray-500">Price Change (24h)</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-24 h-2 rounded-full ${
                      prices[selectedCoin]?.priceChange24h >= 0
                        ? "bg-green-200 dark:bg-green-900"
                        : "bg-red-200 dark:bg-red-900"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${
                        prices[selectedCoin]?.priceChange24h >= 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          Math.abs(prices[selectedCoin]?.priceChange24h || 0),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="font-medium">
                    {Math.abs(prices[selectedCoin]?.priceChange24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
