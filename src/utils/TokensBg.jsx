import { useEffect, useState } from "react";
import cryptoIcons from "./cryptoIcons";
const TokensBg = () => {
  const [prices, setPrices] = useState({});

  const tokens = [
    {
      id: "ethereum",
      name: "ETH",
      img: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      id: "binancecoin",
      name: "BNB",
      img: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    },
    {
      id: "cardano",
      name: "ADA",
      img: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    },
    {
      id: "solana",
      name: "SOL",
      img: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    },
    {
      id: "polkadot",
      name: "DOT",
      img: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    },
    {
      id: "ripple",
      name: "XRP",
      img: cryptoIcons.XRP,
    },
    {
      id: "chainlink",
      name: "LINK",
      img: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    },
  ];

  useEffect(() => {
    const ids = tokens.map((t) => t.id).join(",");
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    )
      .then((res) => res.json())
      .then((data) => setPrices(data))
      .catch((err) => console.error("Failed to fetch prices", err));
  }, []);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-0 w-full flex gap-16 justify-center -translate-y-1/2">
        {tokens.map((token, idx) => {
          const info = prices[token.id];
          const price = info?.usd?.toFixed(2);
          const change = info?.usd_24h_change?.toFixed(2);
          const isUp = change > 0;

          return (
            <div
              key={idx}
              className={`relative w-20 h-20 pointer-events-auto animate-wave motion-delay-${idx * 100} group`}
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              <img
                src={token.img}
                alt={token.name}
                className="w-full h-full opacity-30 blur-sm group-hover:blur-none group-hover:opacity-70 transition duration-700 hover:cursor-pointer"
              />
              {info && (
                <div className="absolute left-full top-1/2 ml-3 -translate-y-1/2 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 px-2 py-1">
                  <div className="font-bold text-pink-400">{token.name}</div>
                  <div>${price}</div>
                  <div className={isUp ? "text-green-400" : "text-red-400"}>
                    {isUp ? "▲" : "▼"} {Math.abs(change)}%
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokensBg;
