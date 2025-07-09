import {useState} from "react"

function FeeTier({isOpen, onSelect}){
    const [selectedTier, setSelectedTier] = useState("")
    const tiers = [0.01, 0.05, 0.3, 1]
    return(
            <div className="w-full mt-2">
             <p className="text-white text-sm mb-2">Fee Tier</p>
             <p className="text-white text-sm">The amount earned providing liquidity. Choose an amount that suits your risk tolerance and strategy.</p>
             <div className="flex flex-col space-y-2">
             {tiers.map((tier)=>(
                <button key={tier} onClick={()=> {setSelectedTier(tier); onSelect(tier)}} className={`p-2 mt-4 rounded-lg text-white border ${selectedTier === tier?'border-pink-400 bg-pink-500/10':'border-white'}`}>
                    {tier}% Fee Tier
                    <span className="text-xs block text-white">
                        {tier === 0.01
                        ?"best for stable pairs"
                        :tier === 0.05
                        ?"low Volitility"
                        :tier === 0.3
                        ?"Most comman tier"
                        :"High volitility "
                     }
                    </span>
                </button>
             ))}    
            </div>   
            </div>
    )
}

export default FeeTier
