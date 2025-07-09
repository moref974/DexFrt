import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import dexAbi from "../MultiChainDex.json";
import { toast } from "react-toastify";
import bridgeAbi from "../MultiChainBridge.json";
import { useAppContext } from "../context/AppContext";
import TokenChart from "../utils/TokenChart";
import TrendingTokens from "../utils/TrendingTokens";
import TokenBackground from "../utils/TokenBackground ";
import TokenSelectorModal from "../utils/TokenSelector";
import RecentSwaps from "../utils/RecentSwaps";
import Spinner from "./Spinner";
const bridgeAddress = "0xd09Cfa8F69580CE3Db1616fB92f137Dd84423E65";
const dexAddress = "0xD9F42fa2BB8295aE294c94b10e8F3d8091FB457f";
function Swap() {
  // contract....
  const {signer, setSigner} = useAppContext();
  const {dexContract, setDexContract} = useAppContext();
  const [bridgeContract, setBridgeContract] = useState(null);
  const { isConnected } = useAccount();
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { data: walletClient } = useWalletClient();
  const [recentSwaps, setRecentSwaps] = useState([]);

  // others....
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [minAmountOut, setMinAmountOut] = useState("");
  const [priceInUSD, setPriceInUSD] = useState(null);
  const [network, setNetwork] = useState("Ethereum");

  const tokenMap = {
    WETH: "ethereum",
    DAI: "dai",
    USDT: "tether",
    USDC: "usd-coin",
  };

  const getDecimal = async (token) => {
    if(token === "0x0000000000000000000000000000000000000000"){
      return 18;
    }
    const erc20 = new ethers.Contract(
      token,
      ["function decimals()view returns(uint8)"],
      signer
    );
    return await erc20.decimals();
  };
  const getProvider = async () => {
    if (window.ethereum !== undefined && window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    } else {
      return new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/e1e0aec60858435592f2aea4f20ab60f"
      );
    }
  };
  useEffect(() => {
    const setup = async () => {
      const provider = await getProvider();
      let dex = null;
      let signer = null;
      if (isConnected && walletClient) {
        signer = await provider.getSigner();
        dex = new ethers.Contract(dexAddress, dexAbi.abi, signer);
        const bridge = new ethers.Contract(
          bridgeAddress,
          bridgeAbi.abi,
          signer
        );
        setSigner(signer);
        setBridgeContract(bridge);
        console.log("Dex witb signer", dex);
      } else {
        dex = new ethers.Contract(dexAddress, dexAbi.abi, provider);
        console.log("Dex witb provider", dex);
        console.log("Provider:", provider);
      }
      setDexContract(dex);
    };
    setup();
  }, [walletClient, isConnected]);

  console.log("DEX:", dexContract);
  console.log("TOKEN IN:", tokenIn);
  const getAmountOutEstimate = async () => {
    if (!tokenIn.address || !tokenOut.address || !amountIn) return;

    const priceInRaw = await dexContract.getLatestPrice(tokenIn.address);
    const priceOutRaw = await dexContract.getLatestPrice(tokenOut.address);
    const priceIn = BigInt(priceInRaw.toString());
    const priceOut = BigInt(priceOutRaw.toString());
    console.log("priceInRaw:", priceInRaw, typeof priceInRaw);
    console.log("priceOutRaw:", priceOutRaw, typeof priceOutRaw);
    const decimalIn = await getDecimal(tokenIn.address);
    const decimalOut = await getDecimal(tokenOut.address);

    const amountInParsed = ethers.parseUnits(amountIn, decimalIn);
    const normalizedAmountIn =
      decimalIn < 18
        ? amountInParsed * 10n ** (BigInt(18) - BigInt(decimalIn))
        : amountInParsed / 10n ** (BigInt(decimalIn) - BigInt(18));
    const normalizedAmountOut = (normalizedAmountIn * priceIn) / priceOut;
    const finalAmount =
      normalizedAmountOut * 10n ** (BigInt(18) - BigInt(decimalOut));
    setMinAmountOut(ethers.formatUnits(finalAmount, decimalOut));
  };

  useEffect(() => {
    getAmountOutEstimate();
  }, [tokenIn.address, tokenOut.address, amountIn, dexContract]);

  const approveAndSwap = async () => {
    if (!dexContract) {
      console.log("Contract is still undefined, please wait until contracts load.");
      return;
    }

    if (!tokenIn.address || !tokenOut.address || !amountIn || !minAmountOut) {
      toast.error("Please fill all Swap inputs first")
      return;
    }
    if(tokenIn.address.toLowerCase() === tokenOut.address.toLowerCase()){
      toast.warning("Cannot swap a token into itself")
      return;
    }
    const decimalIn = await getDecimal(tokenIn.address);
    const amountParsed = ethers.parseUnits(amountIn, decimalIn);
    try {
      console.log("TOKEN CONTRACT ADDRESS BEING USED:", tokenIn.address);
      console.log("TokenOut is:", tokenOut.address)
      console.log("dex:", dexContract.address)
      console.log("dexTar:", dexContract.target)
      console.log("Amount parsed:", amountParsed.toString())
      console.log("Min AmountOut (Parsed):",ethers.parseUnits( minAmountOut, decimalIn).toString())
      console.log("Signer:", signer)
      const tokenContract = new ethers.Contract(
        tokenIn.address,
        [
          "function approve(address spender, uint256 amount)external returns(bool)",
        ],
        signer
      );
      const approveTx = await tokenContract.approve(
        dexContract.target,
        amountParsed
      );
      await approveTx.wait();
      const isEthSwap = tokenIn.address === "0x0000000000000000000000000000000000000000"
      if(!dexContract){
        console.log("dex contract is not defined yet")
        return;
      }
      const tx = await dexContract.swap(
        tokenIn.address,
        tokenOut.address,
        amountParsed,
        ethers.parseUnits(minAmountOut, decimalIn),
        isEthSwap?{
          value: amountParsed
        }:{},
      );
      await tx.wait();
      toast.success("Swap successful")
      const fetchSwaps =  await fetch("http://localhost:5000/api/swap",{
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  from: tokenIn.address,
                  to: tokenOut.address,
                  amount: amountIn,
                  received: minAmountOut,
                  tokenIn: tokenIn.forDataBase,
                  tokenOut: tokenOut.forDataBase
              })
            })
    } catch (error) {
      console.error("Swap failed:", error);
      toast.error("Swap failed")
    }
  };
  useEffect(()=>{
  const fetchSwap =  async()=>{
    const fet = await fetch("http://localhost:5000/api/swaps")
    const data = await fet.json()
    setRecentSwaps(data)
  }
  fetchSwap()
},[])  
  console.log("dd:", network)

  useEffect(() => {
    const fetchPrice = async () => {
      if (tokenIn.address && dexContract && amountIn && !isNaN(amountIn)) {
        try {
          const price = await dexContract.getLatestPrice(tokenIn.address);
          const tokenPrice = Number(price) / 1e8;
          const totalPrice = tokenPrice * Number(amountIn);
          setPriceInUSD(totalPrice.toFixed(2));
        } catch (er) {
          console.error("Error fetching price");
          setPriceInUSD("0");
        }
      } else {
        setPriceInUSD("0");
      }
    };
    fetchPrice();
  }, [tokenIn.address, dexContract, amountIn]);

console.log("TokeNin", tokenIn.address)
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#120019] to-black px-4 py-10 overflow-x-hidden">
      <TokenBackground />

      {/* Center Swap Box */}
      <div className="w-full max-w-md z-10 mb-10">
  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a0023] via-[#1f0034] to-[#0e001b] border border-pink-500/30 shadow-[0_0_30px_#ec489966] space-y-6 text-white">
    <h2 className="text-center text-xl font-bold text-pink-500 drop-shadow-[0_0_4px_#f472b6] uppercase tracking-wide">
      Swap Anytime, Anywhere
    </h2>

    {/* Token In Section */}
    <div className="bg-white/5 p-4 rounded-xl border border-pink-400/20 backdrop-blur-sm shadow-[0_0_10px_#d946ef66] space-y-2">
      <p className="text-sm mb-1 text-pink-300">Sell</p>
      <div className="flex items-center justify-between">
        <input
          placeholder="0.0"
          onChange={(e) => setAmountIn(e.target.value)}
          className="w-24 rounded-lg bg-transparent text-white text-xl placeholder-pink-300 focus:outline-none"
        />
        <button
          onClick={() => {
            setModalTitle("Token In");
            setShowModal(true);
          }}
          className="flex items-center gap-1 bg-green-400 p-2 px-3 rounded-full hover:bg-green-300 text-black font-semibold"
        >
          {tokenIn ? tokenIn.symbol : "Select"}
        </button>
      </div>
      {priceInUSD ? (
        <span className="block text-pink-300 text-right text-sm">≈ ${priceInUSD}</span>
      ) : (
        <Spinner />
      )}
    </div>

    {/* Arrow */}
    <div className="flex justify-center">
      <div className="bg-blue-500 p-1 rounded-full shadow-md animate-bounce">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    {/* Token Out Section */}
    <div className="bg-white/5 p-4 rounded-xl border border-pink-400/20 backdrop-blur-sm shadow-[0_0_10px_#d946ef66] space-y-2">
      <p className="text-sm mb-1 text-pink-300">Buy</p>
      <div className="flex items-center justify-between">
        <input
          placeholder="0.0"
          value={minAmountOut}
          readOnly
          className="w-24 rounded-lg bg-transparent text-white text-xl placeholder-pink-300 focus:outline-none"
        />
        <button
          onClick={() => {
            setModalTitle("Token Out");
            setShowModal(true);
          }}
          className="flex items-center gap-1 bg-orange-400 p-2 px-3 rounded-full hover:bg-orange-300 text-black font-semibold"
        >
          {tokenOut ? tokenOut.symbol : "Select"}
        </button>
      </div>
    </div>

    {/* Action Button */}
    <button
      onClick={approveAndSwap}
      className="w-full py-3 text-sm font-bold rounded-lg bg-pink-600 hover:bg-pink-700 transition-all shadow-[0_0_15px_#ec4899aa]"
    >
      🔥 Enter The Void
    </button>
  </div>
</div>
      {
        <TokenSelectorModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalTitle}
          onSelect={(token) => {
            if (modalTitle === "Token In") setTokenIn(token);
            else {
              setTokenOut(token);
            }
          }}
          network={network}
          setNetwork={setNetwork}
        />
      }
      
      Chart + Trending Section
      <div className="w-full max-w-9xl flex flex-col md:flex-row justify-center items-start gap-6 z-10">
        Chart
        {/* <div className="w-full md:w-1/2">
          {tokenIn && tokenMap[tokenIn.symbol] && (
            <div className="bg-black/30 border border-pink-400/20 p-3 rounded-xl shadow-[0_0_15px_#d946ef66]">
              <TokenChart tokenId={tokenMap[tokenIn.symbol]} />
            </div>
          )}
        </div> */}

        Trending
        {/* <div className="w-full md:w-1/2">
          <TrendingTokens />
        </div>  */}
        <div className="w-full md:w-1/2">
        <RecentSwaps recentSwaps={recentSwaps}/>
        </div>
      </div>
    </div>
  );
}
export default Swap;
