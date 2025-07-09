import { useEffect, useState } from "react"
import tokens from "./Tokens";
const TokenSelectorModal = ({isOpen, onClose, onSelect, title})=>{
       const [network, setNetworks] = useState("Ethereum")
       const [filtered, setFiltered] = useState([]);
        
        useEffect(()=>{
        const updated = tokens.map((token)=>{
            const netData = token.network[network]
            if(netData){
                return{
                    name: token.name,
                    symbol: token.symbol,
                    address: netData.address,
                    tokenLogo: token.logUri,
                    networkLogo: netData.logUri
                }
            }
            return null;
        }).filter(Boolean)
        setFiltered(updated)
        },[network])
        const handleChange = (e)=>{
        setNetworks(e.target.valuet)
       }
       if(!isOpen) return null;
      
       return(
       <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
       <div className="bg-[#1a0023] rounded-2xl w-full max-w-md p-6  text-white relative shadow-2xl border border-pink-400/30">
       {/* close Button */}
       <button onClick={onclose} className="absolute top-3 right-4 text-pink-400 text-lg">Close</button>
       {/* title & network selector */}
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-pink-400">{title}</h2>
        <select value={network} onChange={(e)=> setNetworks(e.target.value)} className="bg-black/30 border border-pink-400 text-white p-2 rounded-md text-sm">
                 <option >Ethereum</option>
                 <option >Avalanche</option>
                 <option >Arbitrum</option>
                 <option >Polygon</option>
                 <option >zkSync</option>
                 <option >Base</option>
        </select> 
       </div>
       {/* tokens list */}
       <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filtered.map((token, idx)=>(
            <div
            key={idx}
            onClick={()=>{
                onSelect(token);
                onClose();
                
            }}
            className="flex items-center justify-between p-3 bg-white/5 hover:bg-pink-500/20 rounded-lg cursor-pointer"
            >
                <div className="flex items-center gap-3">
        <img 
        src={token.tokenLogo}
        alt={token.symbol}
        className="w-6 h-6 rounded-full"
        />
        </div>
        <div className="font-medium">{token.symbol}</div>
        <div className="text-xs text-pink-300 break-all">{token.address.slice(0,6)}...{token.address.slice(-4)}
        </div>
        </div>
        ))}
       </div>
       </div>
       </div>
       ) 
}
export default TokenSelectorModal