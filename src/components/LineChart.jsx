import React from "react";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "./ui/card";

import {
  Chart as ChartJS,
  CategoryScale, // For X axis
  LinearScale, // For Y axis
  PointElement, // For data points
  LineElement, // For line between points
  Tooltip, // For hover tooltips
  Filler, // For area fill below line
} from "chart.js";

// 3. Register the Chart.js components we imported
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

// 4. Define time range options for the chart
const timeRanges = [
  { label: "24H", value: "1" }, // 1 day
  { label: "7D", value: "7" }, // 7 days
  { label: "30D", value: "30" }, // 30 days
];

function LineChart({ priceData }) {
  const [selectedRange, setSelectedRange] = useState("7"); // Default to 7 days
  const [chartData, setChartData] = useState(null); // Store chart data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // 6. Fetch data when component mounts or when dependencies change
  useEffect(() => {
    // Don't fetch if we don't have required data
    if (!priceData || !coinId) return;

    async function fetchData() {
      try {
        // Start loading
        setIsLoading(true);
        setError(null);

        // Get historical price data
        const historyData = await getHistoricalData(
          coinId,
          parseInt(selectedRange)
        );

        // Format dates for X-axis
        const timestamps = historyData.map((point) => {
          const date = new Date(point.timestamp);
          // Show hours:minutes for 24h view, otherwise show month/day
          return selectedRange === "1"
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : date.toLocaleDateString([], { month: "short", day: "numeric" });
        });
        // Get prices for Y-axis
        const prices = historyData.map((point) => point.price);
      } catch (e) {}
    }
  }, []);
  return <div>LineChart</div>;
}

export default LineChart;
