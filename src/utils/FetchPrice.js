import moment from "moment"
export async function fetchCurrentPrice(tokenId = "ethereum") {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`);
  const data = await res.json();
  return {
    time: moment().format("HH:mm:ss"),
    price: data[tokenId].usd,
  };
}