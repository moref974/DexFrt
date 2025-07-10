import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Sparklines, SparklinesLine  } from "react-sparklines";
import tokens from "../utils/Tokens";
import TokensBg from "../utils/TokensBg";
import cryptoIcons from "../utils/cryptoIcons";
import { ethers } from "ethers";
function Pool() {
  const { dexContract } = useAppContext();
  const [pools, setPools] = useState([]);
  const selectedNetwork = "SepoliaTestnet";
  const fetchAllPools = async () => {
    const result = [];
    for (let token of tokens) {
      const tokenAdr = token?.network[selectedNetwork]?.address;
      if (!tokenAdr) continue;
      try {
        const pool = await dexContract.liquidityPools(tokenAdr);
        if (pool.amount > 0) {
          result.push({
            symbol: token.symbol,
            address: tokenAdr,
            name: token.name,
            network: selectedNetwork,
            image: token.symbol,
            amount: pool.amount.toFixed(6),
            Change24h: (Math.random() * 10 - 5).toFixed(2),
            trend:  Array.from({length: 10},()=> Math.floor(Math.random()*100))
          });
        }
        console.log("adr:", tokenAdr);
      } catch (error) {
        console.log("error:", error);
      }
    }
    setPools(result);
  };
  useEffect(()=>{
    fetchAllPools()
  },[fetchAllPools])
  return (
    <div className=" relative z-10 overflow-x-auto sm:px-4 py-10 min-h-screen shadow-md  backdrop-blur-md bg-gradient-to-br from-black via-[#120019] to-black ">
      <TokensBg/>
      <TokensBg/>
      <br/>
      <TokensBg/>
      <p
        className="mb-6 text-center -mt-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded shadow hover:from-purple-600 hover:to-pink-600 transition duration-200 text-sm sm:text-base md:text-lg"
      >
        Single Pair Pool 
      </p>
     <div className="w-full overflow-x-hidden">
      <table className="min-w-full text-xs sm:text-sm text-left text-white">
        <thead className="text-xs bg-purple-800/40 text-purple-200">
          <tr>
            <th scope="col" className="px-2 sm:px-4 py-2">
              Pair
            </th>
            <th className="px-2 py-2 sm:px-4">
              ON Network
            </th>
            <th scope="col" className="px-2 sm:px-4 py-2">
              Symbol
            </th>
            <th scope="col" className="px-2 sm:px-4 py-2">
              Liquidity
            </th>
            <th className="px-2 sm:px-4 py-2">
              24HChange
            </th>
            <th className="px-2 sm:px-4 py-2">Trend</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool, idx) => (
            <tr
              key={idx}
              className="border-b border-purple-700 hover:bg-purple-900/30 transition duration-150"
            >
              <td className="px-2 sm:px-4 py-2">
                <img
                  src={cryptoIcons[pool.image]}
                  alt={pool.symbol}
                  className=" w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-md"
                />
              </td>
              <td className="px-2 py-2 sm:px-4 font-medium">{pool.network}</td>
              <td className="px-2 sm:px-4 py-2 font-medium">{pool.symbol}</td>
              <td className="px-2 sm:px-4 py-2 text-pink-300">{ethers.formatEther(pool.amount)}</td>
              <td className={`px-2 sm:px-4 py-2 font-semibold ${pool.Change24h >0 ? `text-green-400`: `text-red-400` }`}>{pool.Change24h >0 ? "▲" : "▼"}{pool.Change24h}%</td>
              <td  className="px-2 sm:px-4 py-2 min-w-[70px]">
                <Sparklines data={pool.trend}>
                  <SparklinesLine color={pool.Change24h >0 ? "lime": "red"} style={{strokeWidth: 3, fill: "none"}} />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
export default Pool;
