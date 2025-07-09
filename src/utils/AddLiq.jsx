import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cryptoIcons from "./cryptoIcons";
import { useAccount } from "wagmi";
import PriceChart from "./PriceChart";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
function AddLiq() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { token, dexContract, signer } = useAppContext();
  const [priceUSD, setPriceUSD] = useState("");

  const getDecimal = async()=>{
    if(token.address === "0x0000000000000000000000000000000000000000"){
      return 18;
    }
    const erc20 = new ethers.Contract(token.address, ["function decimals()view returns(uint8)"],signer)
    return await erc20.decimals();
  }
  const addLiq = async () => {
    try {
    if (!token.address || !signer || !dexContract || !amount || !isConnected) {
      return;
    }

      const isEth =  token.symbol === "ETH";
      const decimalIn = await getDecimal(token.address)
      const ETHdecimal = await getDecimal(token.address)
      const parseAmount = ethers.parseUnits(amount, isEth?ETHdecimal:decimalIn);
      if(isEth){
  const tx = await dexContract.addLiquidity(
    ethers.ZeroAddress,
    parseAmount,
    token.chainId,
    isEth?{value: parseAmount}:{}
  );
  await tx.wait();
  toast.success("ETH (WETH) Liquidity Added");
      }else{

console.log("Amount input:", amount);
console.log("Decimal in:", decimalIn); 
console.log("Parsed amount:", parseAmount.toString())

        const tokenContract = new ethers.Contract(
        token.address,
        [
          "function approve (address spender, uint256 amount)external returns(bool)",
        ],
        signer
      );
      console.log("tokenContract:", tokenContract);
      const approveTx = await tokenContract.approve(dexContract.target, parseAmount);
      await approveTx.wait();
      console.log("approveTx:", approveTx);

      const tx = await dexContract.addLiquidity(
        token.address,
        parseAmount,
        token.chainId,
        isEth?{value: parseAmount}:{}
      );
      if(!tx || typeof tx.wait !== "function"){
        console.error("❌ tx is missing (Transaction failed)!")
        return;
      }
      console.log("addLiquidity response:", tx);
      await tx.wait();
      toast.success("Liquidity Added") 
      }
    } catch (error) {
      toast.error("Failed to add position")
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    if (token && token.symbol) {
      setImage(token.symbol);
    }
  }, [token]);

    useEffect(() => {
  const fetchPrice = async () => {
    try {
        if (
        !token?.address ||
        typeof dexContract?.getLatestPrice !== "function" ||
        !amount ||
        isNaN(parseFloat(amount)) ||
        parseFloat(amount) <= 0
      ) {
        console.warn("❌ Skipping price fetch due to invalid input");
        setPriceUSD("0.00");
        return;
      }
      // Fetch price
const price = await dexContract.getLatestPrice(token.address);
console.log("📈 Raw price (BigNumber):", price.toString());

if (price.toString() === "0") {
  console.warn("⚠️ Price feed returned 0. Check contract feed setup.");
}

      const tokenPrice = Number(ethers.formatUnits(price, 8)); // assuming 8 decimals
      const totalPrice = tokenPrice * parseFloat(amount);

      console.log("✅ Total price USD:", totalPrice.toFixed(2));
      setPriceUSD(totalPrice.toFixed(2));
    } catch (err) {
      console.error("💥 Error fetching price:", err.message || err);
      setPriceUSD("0.00");
    }
  };

  fetchPrice();
}, [token?.address, dexContract, amount]);
console.log("forChart:", token.forChart)
  if (!token) {
    return <div className="text-white">Loading token...</div>;
  }
  return (
    <div className="flex-col flex space-y-8 sm:space-y-10 justify-start min-h-screen items-center w-full bg-gradient-to-br from-black via-[#120019] to-black px-4 py-8 sm:py-10 overflow-x-hidden">
      <div className="border border-blue-600 w-full max-w-3xl mx-auto p-6 space-y-10">
        <PriceChart tokenName={token.forChart} />
        <div className=" mt-14 w-full max-w-md mx-auto p-4 rounded-t-md border border-purple-500 border-blur-sm shadow-[0_0_10px_#d946ef66]">
          <button
            className={`relative -top-4 px-4 py-1 -ml-4 rounded-t-md text-white border border-purple-400 shadow-[0_0_10px_#d946ef66] hover:bg-purple-600 hover:shadow-[0_0_12px_#d946ef99] transition`}
            onClick={() => navigate("/AddLiquidity")}
          >
            Previous
          </button>
          <h2 className="text-sm text-white">
            Specify the amount for your liquidity constributer
          </h2>
          <div className="flex mt-2 justify-between">
            <input
              className="w-28 bg-transparent border-none text-white outline-none"
              placeholder="0.0$"
              onChange={(e) => setAmount(e.target.value)}
            />
            <img
              src={cryptoIcons[image]}
              alt={token.symbol}
              className="w-8 h-8 rounded-full"
            />
          </div>
            <p className="text-white ">{priceUSD?priceUSD:"0.0$"}</p>
        </div>
        <div className="justify-center flex items-center w-full">
          <button
            className="rounded-lg bg-purple-500 text-white px-6 py-2 w-full max-w-xs"
            onClick={addLiq}
          >
            {isConnected ? "Let's Start it" : "Connect Web3"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddLiq;
