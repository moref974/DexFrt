import useCoinList from "./CoinList";

const TokenBackground = ()=>{
    const tokenList = [
  {
    id: "ethereum",
    name: "ETH",
    img: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    position: "top-10 right-40",
    borderColor: "hover:border-[#627eea]", // Ethereum blue
  },
  {
    id: "bitcoin",
    name: "BTC",
    img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    position: "top-60 right-24",
    borderColor: "hover:border-yellow-400",
  },
  {
    id: "tether",
    name: "USDT",
    img: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
    position: "top-20 left-40",
    borderColor: "hover:border-green-400",
  },
  {
    id: "binancecoin",
    name: "BNB",
    img: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    position: "top-60 left-28",
    borderColor: "hover:border-yellow-300",
  },
  {
    id: "chainlink",
    name: "LINK",
    img: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    position: "top-32 right-10",
    borderColor: "hover:border-blue-400",
  },
  {
    id: "uniswap",
    name: "UNI",
    img: "https://assets.coingecko.com/coins/images/12504/large/uni.jpg",
    position: "top-72 left-16",
    borderColor: "hover:border-pink-400",
  },
];

    const prices = useCoinList(tokenList.map((c)=> c.id));

    return(
        <div className="absolute inset-0 z-10 overflow-hidden animate-float">
  {tokenList.map((token, i) => {
    const priceInfo = prices[token.id];
    const price = priceInfo?.usd?.toFixed(2);
    const change = priceInfo?.usd_24h_change?.toFixed(2);
    const isPump = change > 0;

    return (
      <div
        key={i}
        className={`absolute ${token.position} group w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-transparent ${token.borderColor} transition-all duration-700`}
      >
        <img
          src={token.img}
          alt={token.name}
          className="w-full h-full opacity-30 blur-md hover:cursor-pointer hover:animate-pulse animate-slowSpin hover:blur-none hover:opacity-60 transition-all duration-700 rounded-full"
        />
        {price && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="font-bold text-pink-400">{token.name}</div>
            <div>${price}</div>
            <div className={isPump ? "text-green-400" : "text-red-400"}>
              {isPump ? "▲" : "▼"} {Math.abs(change)}%
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

    )
}

export default TokenBackground