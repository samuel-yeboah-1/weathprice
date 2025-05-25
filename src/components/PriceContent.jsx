import React from "react";
import { useCryptoContext } from "@/contexts/PriceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CoinCard } from "./CoinCard";
import LineChart from "./LineChart";
import { getCryptoPrices } from "@/services/coins.services";
function PriceContent() {
  const { selectedCoin, setSelectedCoin } = useCryptoContext();

  const {
    data: prices,
    isError,
    error,
    isLoading,
  } = getCryptoPrices({
    coins: [selectedCoin],
  });

  function renderPricesError() {
    if (isError) {
      return (
        <div className="p-4 max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">Cryptocurrency Price</h1>
            <Select
              value={selectedCoin}
              onValueChange={setSelectedCoin}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select a cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CoinCard prices={prices} isLoading={isLoading} />

          {prices?.[selectedCoin] && (
            <LineChart priceData={prices[selectedCoin]} />
          )}
        </div>
      );
    }
  }
  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cryptocurrency Price</h1>
        <Select
          value={selectedCoin}
          onValueChange={setSelectedCoin}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="Select a cryptocurrency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
            <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CoinCard prices={prices} isLoading={isLoading} />

      {prices?.[selectedCoin] && <LineChart priceData={prices[selectedCoin]} />}
    </div>
  );
}

export default PriceContent;
