import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import LineChart from "./LineChart";
import { coinsService } from "@/services/coins.services";
import React, { useState } from "react";

function PriceContent() {

    const [selectedCoin, setSelectedCoin] = useState('bitcoin')
  const {
    data: prices,
    isError,
    error,
    isLoading,
  } = coinsService.getCryptoPrices({
    coins: [selectedCoin],
  });


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

      {prices?.[selectedCoin] && <LineChart priceData={prices[selectedCoin]} />}
    </div>
  );
}

export default PriceContent;
