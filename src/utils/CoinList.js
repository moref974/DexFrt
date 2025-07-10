import { useEffect, useState } from "react"

const useCoinList = (ids = [])=>{
    const [prices, setPrices] = useState({})
    useEffect(()=>{
        if(ids.length === 0) return;
    const fetchPrice = async()=>{
    try{
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`)
    const data = await res.json()
    setPrices(data)
        }catch(error){
           console.log("error fetching price:", error) 
        }
    }
    fetchPrice()
    },[ids]
)
return prices;
}
export default useCoinList;