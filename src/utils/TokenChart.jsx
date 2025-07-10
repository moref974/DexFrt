import { fetchCurrentPrice } from "./FetchPrice";
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as chartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

chartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TokenChart = ({ tokenId = "ethereum" }) => {
  const [prices, setPrices] = useState([]);
  const [livePrice, setLivePrice] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const getInitialPrices = async () => {
      const data = await fetchCurrentPrice(tokenId); // should return { time, price }
      setPrices([data]);
      setLivePrice(data.price);
    };
    getInitialPrices();
  }, [tokenId]);

  useEffect(() => {
    const fetch = async () => {
      const currentPriceData = await fetchCurrentPrice(tokenId);
      setPrices([currentPriceData])
      setLivePrice(currentPriceData.price);
    };
    fetch()
  }, [tokenId]);

  const data = {
    labels: prices.map((_, i) => -`${prices.length - i}`),
    datasets: [
      {
        label: "Price (USD)",
        data: prices.map((p) => p.price),
        fill: false,
        borderColor: "#ec4899",
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: {
        ticks: { color: "#f9a8d4" },
        grid: { color: "#f472b680" },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [prices]);

  return (
    <div className="p-4 bg-[#1a0023] rounded-xl shadow-[0_0_15px_#d946ef66]">
      <h3 className="text-pink-300 font-semibold mb-2 text-center">
        Current Price {livePrice !== null ?`$${livePrice.toFixed(2)}`: ""}
      </h3>
      {prices.length > 0 ? (
        <Line ref={chartRef} data={data} options={options} />
      ) : (
        <div className="text-center text-pink-300">Loading...</div>
      )}
    </div>
  );
};

export default TokenChart;
