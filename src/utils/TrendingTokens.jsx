import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const TrendingTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingRes = await axios.get("https://api.coingecko.com/api/v3/search/trending");
        const coinIds = trendingRes.data.coins.map(c => c.item.id);

        const priceRes = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            ids: coinIds.join(','),
            sparkline: true
          }
        });

        setTokens(priceRes.data);
        console.log("priceRes.Data = ", priceRes.data)

        const globalRes = await axios.get("https://api.coingecko.com/api/v3/global");
        setMarketData(globalRes.data.data);

      } catch (error) {
        console.error("Error fetching trending tokens:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-transparent rounded-xl ">
      <h3 className="text-pink-300 text-center font-semibold mb-3">Trending Tokens</h3>
      {tokens.map((token) => (
        <div
          key={token.id}
          className="flex justify-between items-center text-sm text-pink-100 py-2 border-b border-[#f472b622]"
        >
          <div className="flex items-center gap-2">
            <img src={token.image} alt={token.symbol} className="w-5 h-5" />
            <div>
              <div className="font-semibold">
                {token.name} ({token.symbol.toUpperCase()})
              </div>
              <div className="text-md text-red-500">
                ${token.current_price.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div
              className={`text-right ${
                token.price_change_percentage_24h > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {token.price_change_percentage_24h > 0 ? "↑" : "↓"}
              {Math.abs(token.price_change_percentage_24h).toFixed(2)}%
            </div>
            <div className="w-24 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={token.sparkline_in_7d?.price.map((p, index) => ({
                    price: p,
                    index,
                  })) || []}
                >
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={
                      token.price_change_percentage_24h > 0
                        ? "#4ade80"
                        : "#f87171"
                    }
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ))}

      {marketData && (
        <div className="mt-4 space-y-2 text-sm text-pink-100">
          <div>
            Market Sentiment:{" "}
            <span
              className={
                marketData.market_cap_change_percentage_24h_usd > 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {marketData.market_cap_change_percentage_24h_usd > 0
                ? "Bullish"
                : "Bearish"}
            </span>
          </div>
          <div>
            BTC Dominance:{" "}
            <span className="text-yellow-300">
              {marketData.market_cap_percentage.btc.toFixed(1)}%
            </span>
          </div>
          <div>
            ETH Dominance:{" "}
            <span className="text-indigo-300">
              {marketData.market_cap_percentage.eth.toFixed(1)}%
            </span>
          </div>
          <div>
            Global Volume (24h):{" "}
            <span className="text-pink-300">
              ${(marketData.total_volume.usd / 1e9).toFixed(2)}B
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingTokens;