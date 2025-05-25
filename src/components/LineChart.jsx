import React, { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

import { Line } from "react-chartjs-2";
import { Card } from "./ui/card";

import { coinsService } from "@/services/coins.services";
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

  const coinId = "Bitcoin";

  // 6. Fetch data when component mounts or when dependencies change
  useEffect(() => {
    // Don't fetch if we don't have required data
    if (!priceData) return;

    async function fetchData() {
      try {
        // Start loading
        setIsLoading(true);
        setError(null);

        // Get historical price data
        const historyData = await coinsService.getHistoricalData(
          coinId,
          parseInt(selectedRange)
        );

        console.log(historyData);

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

        // Set up chart data
        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              borderColor:
                priceData.priceChange24h >= 0 ? "#22c55e" : "#ef4444", // Green if up, red if down
              backgroundColor: "#22c55e20", // Simplified: light green background
              borderWidth: 2,
              fill: true, // Fill area under line
              tension: 0.4, // Make line curved
              pointRadius: 0, // Hide points
              pointHitRadius: 20, // Click area for points
            },
          ],
        });
      } catch (err) {
        setError(err.message || "Failed to fetch chart data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [coinId, selectedRange, priceData]);

  // 7. Chart configuration options
  const chartOptions = {
    responsive: true, // Make chart responsive
    maintainAspectRatio: false, // Allow custom height

    // Configure plugins
    plugins: {
      tooltip: {
        // Show tooltip on hover
        callbacks: {
          label: (context) => {
            // Format price with $ and 2 decimal places
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },

    // Configure axes
    scales: {
      x: {
        grid: { display: false }, // Hide X grid lines
      },
      y: {
        grid: { color: "#00000010" }, // Light grid lines
        ticks: {
          // Format Y axis ticks with $
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
  };
  return (
    <Card className="mt-6 p-4">
      <div className="flex flex-col gap-4">
        {/* Header with title and time range buttons */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Price Chart</h3>

          {/* Time range selection buttons */}
          <div className="flex gap-2">
            {timeRanges.map(({ label, value }) => (
              <button
                key={value}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  selectedRange === value
                    ? "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground" // Selected button style
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground" // Unselected button style
                }`}
                onClick={() => setSelectedRange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart container */}
        <div className="h-[300px] relative">
          {/* Show loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <Spinner />
            </div>
          )}

          {/* Show error message */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              {error}
            </div>
          )}

          {/* Show chart when data is available */}
          {chartData && !isLoading && !error && (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </Card>
  );
}

export default LineChart;
