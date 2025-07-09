import { useEffect, useState } from "react";
import tokens from "./Tokens";
import cryptoIcons from "./cryptoIcons";

const TokenSelectorModal = ({ isOpen, onClose, onSelect, title, network ,setNetwork}) => {
  const [filteredTokens, setFilteredTokens] = useState([]);

  useEffect(() => {
    const updated = tokens
      .map((token) => {
        const netData = token.network[network];
        if (netData) {
          return {
            name: token.name,
            forChart: token.forChart,
            symbol: token.symbol,
            address: netData.address,
            tokenLogo: token.logUri,
            networkLogo: netData.logUri,
            chainId: netData.chainId,
          };
        }
        return null;
      })
      .filter(Boolean);
    setFilteredTokens(updated);
  }, [network]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-[#1a0023] rounded-2xl w-full max-w-md p-6 text-white relative shadow-2xl border border-pink-400/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0.5 right-2 text-pink-400  text-sm font-semibold hover:text-red-500"
        >
          ✖
        </button>

        {/* Title + Network Selector */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-pink-400">{title}</h2>
          <select
            value={network}
              onChange={(e) => setNetwork(e.target.value)}
            className="bg-black/30 border border-pink-400 text-white p-2 rounded-md text-sm"
          >
            <option>Ethereum</option>
            <option>Avalanche</option>
            <option>Arbitrum</option>
            <option>Polygon</option>
            <option>zkSync</option>
            <option>Base</option>
            <option>SepoliaTestnet</option>
          </select>
        </div>

        {/* Token List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {filteredTokens.map((token, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className="flex items-center justify-between p-3 bg-white/5 hover:animate-pulse hover:bg-pink-500/20 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={token.tokenLogo} alt={token.symbol} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-sm">{token.symbol}</div>
                  <div className="text-sm">{token.name}</div>
                  <div className="text-xs text-pink-300 break-all">
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </div>
                </div>
              </div>
              <img src={token.networkLogo} alt="network" className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenSelectorModal;