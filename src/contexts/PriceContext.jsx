import React, { createContext, useContext, useState, useEffect } from "react";

const PriceContext = createContext({
  selectedCoin: "",
  setSelectedCoin: () => null,
});

export function CryptoProvider({ children, defaultCoin = "bitcoin" }) {
  const [selectedCoin, setSelectedCoin] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCoin");
      return saved || defaultCoin;
    } catch {
      return defaultCoin;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("selectedCoin", selectedCoin);
      setError(null);
    } catch (err) {
      setError("Failed to save coin selection");
      console.error("Failed to save coin selection:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCoin]);

  const value = {
    selectedCoin,
    setSelectedCoin,
    isLoading,
    error,
  };

  return (
    <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
  );
}

export const useCryptoContext = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("useCrypto must be used within a CryptoProvider");
  }
  return context;
};
