import CoinList from "./CoinList";

const TokenBackground = ()=>{
    const coinList = [
        {
      id: "ethereum",
      name: "ETH",
      img: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      style: "top-10 right-40 w-24 h-24"
        },
        {
      id: "bitcoin",
      name: "BTC",
      img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      style: "top-60 right-24 w-28 h-28",
    },
    {
      id: "tether",
      name: "USDT",
      img: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
      style: "top-20 left-40 w-20 h-20",
    },
    {
      id: "binancecoin", 
      name: "BNB",
      img: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
      style: "top-60 left-28 w-20 h-20",
    },
    ]
    const prices = CoinList(coinList.map((c)=> c.id));

    return(
        <div className="absolute inset-0 z-10 overflow-hidden animate-float">
            {coinList.map((coin, i)=>{
                const priceInfo = prices[coin.id]
                const price = priceInfo?.usd.toFixed(2)
                const change = priceInfo?.usd_24h_change?.toFixed(2);
                const isPump = change >0;
                return(
                    <div key={i} className={`absolute ${coin.style} group`}>
                     <img
                     src={coin.img}
                     alt={coin.name}
                     className="w-full h-full opacity-30 blur-md hover:cursor-pointer hover:animate-pulse animate-slowSpin hover:blur-none hover:opacity-60 transition-all duration-700"
                     />
                     {prices &&(
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="font-bold text-pink-400">{coin.name}</div> 
                        <div>{price}</div>
                        <div className={isPump?"text-green-400":"text-red-400"}>{isPump ? "▲" : "▼"}{Math.abs(change)}%
                            </div>   
                        </div>
                     )}
                    </div>
                )
            })}
        </div>
    )
}

export default TokenBackground