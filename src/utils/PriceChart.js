import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

function PriceChart({ tokenName }) {
  const [chartData, setChartData] = useState(null);
  const [modal,  setmodal] = useState(false)
  const [days, setDays] = useState("1")
  useEffect(() => {
    async function fetchPrice() {
    try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenName}/market_chart?vs_currency=usd&days=${days}`
        );
        const data = await response.json();

        const labels = data.prices.map(([timestamp]) =>
          new Date(timestamp).toLocaleDateString()
        );
        const price = data.prices.map(([, price]) => price);

        setChartData({
          labels,
          datasets: [
            {
              label: `${tokenName} Price (USD)`,
              data: price,
              fill: false,
              borderColor: "rgb(89, 0, 255)",
              tension: 0.1,
            },
          ],
        });
      }catch (error) {
      console.log(error);
    }
    } 
       if(tokenName){
       fetchPrice()
   }
  },[tokenName]);
  const options = [7,14,30,360]
    if (!chartData) return <div className="text-white">Loading chart...</div>;
    return(
<div className="w-full max-w-xl h-64 mx-auto border border-purple-400 shadow-from to-blue-300 border-r-purple-400 to-blue-400 shadow-lg">
  <div className="relative inline-block w-48">
  <button className="bg-transparent text-purple-500 px-3 py-2 w-full rounded-md text-left" onClick={()=> setmodal((prev)=> !prev)}>{days}Day</button>
  {modal && <ul className="flex justify-center items-center">
    {options.map((opt)=>(
      <li key={opt} className="px-3 py-2 text-xs hover:bg-purple-800 text-purple-300 cursor-pointer" onClick={()=> setDays(opt)}>
       {opt}
      </li>
    ))}
  </ul>}
  </div>
  <div className="w-full h-40 relative">
  <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
  </div>
</div>)
}

export default PriceChart