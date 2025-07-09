import cryptoIcons from "./cryptoIcons"
import Copy from "./copy"
import HoverBox from "./hoverBox"
  const RecentSwaps = ({recentSwaps})=>{
    return(
        <div className="p-4 mt-6 rounded-xl w-full border border-purple-500 overflow-x-auto">
          <h2 className="text-md text-purple-400 animate-pulse text-center mb-2 font-semibold">Swap History</h2>
         <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
                <tr className="bg-purple-100 ">
                    <th className="border border-purple-300 px- py-2">Token</th>
                    <th className="border border-purple-300 px-3 py-2">From</th>
                    <th className="border border-purple-300 px-3 py-2">To</th>
                    <th className="border border-purple-300 px-3 py-2">Amount</th>
                    <th className="border border-purple-300 px-3 py-2">Received</th>
                    <th className="border border-purple-300 px-3 py-2">Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {recentSwaps.map((swap, idx)=>(
                  <tr key={idx}>
                   <td className="border text-white border-purple-300 px-3 py-2"><div className="relative w-10 h-10">
                  <img src={cryptoIcons[swap.token]} alt="TokenFrom Logo" className="w-8 h-8 rounded-full border border-white absolute left-0 z-10"/>
                  <img src={cryptoIcons[swap.tokenOut]} alt="TokenTo Logo" className="w-8 h-8 rounded-full border-2 border-white absolute left-4 z-0"/>
                  </div></td>
                   <td className="border text-white border-purple-300 px-3 py-2 hover:text-blue-500 hover:cursor-pointer"title={swap.from}><div className="flex justify-between ">{typeof swap.from === "string"?`${swap.from.slice(0,5)}...${swap.from.slice(-3)}`: "N/A"} <Copy address={swap.from}/> </div></td>
                   <td className="border text-white border-purple-300 px-3 py-2 hover:text-blue-500 hover:cursor-pointer" title={swap.to} onMouseEnter={<HoverBox address={swap.to}/>}><div className="flex justify-between ">{typeof swap.to === "string"?`${swap.to.slice(0,5)}...${swap.to.slice(-3)}`: "N/A"}<Copy address={swap.to}/></div></td>
                   <td className="border text-white border-purple-300 px-3 py-2">{swap.amount} {swap.tokenIn}</td>
                   <td className="border text-white border-purple-300 px-3 py-2">{typeof swap.received === "string"?swap.received.slice(0,6):"N/A"}</td>
                   <td className="border text-white  border-purple-300 px-3 py-2">{new Date(swap.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
         </table>
        </div>
    )
  }
  export default RecentSwaps