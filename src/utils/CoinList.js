import { useEffect, useState } from "react"

const CoinList = (ids = [])=>{
    const [prices, setPrices] = useState({})
    useEffect(()=>{
        if(ids.length === 0) return;
    const fetchPrice = async()=>{
    try{
    const res = await fetch(`http://localhost:5000/api/prices?ids=${ids.join(',')}`)
    const data = await res.json()
    setPrices(data)
        }catch(error){
           console.log("error fetching price:", error) 
        }
    }
    fetchPrice()
    const interval = setInterval(fetchPrice, 60000) // update every 1 minute 
    return ()=> clearInterval(interval)
    },[ids]
)
return prices;
}
export default CoinList;