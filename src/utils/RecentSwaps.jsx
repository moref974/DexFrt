import cryptoIcons from "./cryptoIcons";
import CopyAd from "./copy";

const RecentSwaps = ({ recentSwaps }) => {
  return (
    <div className="p-2 mt-6 rounded-xl w-full overflow-x-auto">
      <h2 className="text-md text-pink-300 text-center mb-3 font-semibold">
        Latest Transactions
      </h2>

      <table className="table-fixed w-full min-w-[700px] text-center border-collapse">
        <thead>
          <tr className="text-purple-500 font-semibold">
            <th className="px-3 py-2 w-16 border-b border-[#f472b622] animate-pulse">Type</th>
            <th className="px-3 py-2 w-16 border-b border-[#f472b622] animate-pulse">Token</th>
            <th className="px-3 py-2 w-16 border-b border-[#f472b622] animate-pulse">Address</th>
            <th className="px-3 py-2 w-16 border-b border-[#f472b622] animate-pulse">Token</th>
            <th className="px-3 py-2 w-16 border-b border-[#f472b622] animate-pulse">Address</th>
            <th className="px-3 py-2 w-16 border-b border-[#f472b622] animate-pulse">Wallet</th>
          </tr>
        </thead>

        <tbody>
          {recentSwaps.map((swap, idx) => (
            <tr key={idx}>
              <td className="px-2 py-2 border-b border-[#f472b622]">
                <div className="flex items-center justify-center -space-x-2">
                  <img
                    src={cryptoIcons[swap.tokenIn]}
                    alt="From Token"
                    className="w-8 h-8 rounded-full border border-white z-10"
                  />
                  <img
                    src={cryptoIcons[swap.tokenOut]}
                    alt="To Token"
                    className="w-8 h-8 rounded-full border-2 border-white z-0"
                  />
                </div>
              </td>

              <td className="px-2 py-2 border-b border-[#f472b622] text-white">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="truncate text-sm">{swap.amount} {swap.tokenIn}</span>
                  <img src={cryptoIcons[swap.tokenIn]} alt="image" className="w-6 h-6 rounded" />
                </div>
              </td>

              <td className="px-2 py-2 border-b border-[#f472b622] text-white relative group">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span>{swap.from?.slice(0, 5)}...{swap.from?.slice(-3)}</span>
                    <CopyAd address={swap.from} />
                  </div>
                  <div className="text-xs text-purple-300">{swap.tokenIn}</div>
                </div>
              </td>

              <td className="px-2 py-2 border-b border-[#f472b622] text-white">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="truncate text-sm">{swap.received?.slice(0,7)} {swap.tokenOut}</span>
                  <img src={cryptoIcons[swap.tokenOut]} alt="image" className="w-6 h-6 rounded" />
                </div>
              </td>

              <td className="px-2 py-2 border-b border-[#f472b622] text-white relative group">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span>{swap.to?.slice(0, 5)}...{swap.to?.slice(-3)}</span>
                    <CopyAd address={swap.to} />
                  </div>
                  <div className="text-xs text-green-300">{swap.tokenOut}</div>
                </div>
              </td>

              {/* Wallet / Signer */}
              <td className="px-2 py-2 border-b border-[#f472b622] text-white">
                {swap.signer
                  ? `${swap.signer.slice(0, 5)}...${swap.signer.slice(-3)}`
                  : "0x123...7E9"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSwaps;
