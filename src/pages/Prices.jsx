import React from "react";
import PriceContent from "@/components/PriceContent";
import { PriceContextProvider } from "@/contexts/PriceContext";

function Prices() {
  return (
    <PriceContextProvider>
      <PriceContent />
    </PriceContextProvider>
  );
}

export default Prices;
