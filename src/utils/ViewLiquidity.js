import { useAppContext } from "../context/AppContext"
import { useAccount } from "wagmi"
import {ethers} from "ethers"
import TokenSelectorModal from "./TokenSelector"
import { useState } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion";
function ViewLiquidity (){
    const {signer, dexContract} = useAppContext()
    const [showModal, setShowModal] = useState(false)
    const [removeAmount, setRemoveAmount] = useState("");
    const [title, setModalTitle] = useState("")
    const [network, setNetwork] = useState("")
    const [token, setSelectToken] = useState("")
    const [liquidityInfo, setLiquidityInfo] = useState(null);
    const {isConnected} =  useAccount()
    const viewLiq = async()=>{
        if(token.address && dexContract){
        try{
    const [userAmount, totalPool, lpToken] = await dexContract.viewUserLiquidity(signer.address,token.address)
    setLiquidityInfo({
        userAmount: ethers.formatEther(userAmount),
        totalPool: ethers.formatEther(totalPool),
        lpToken: ethers.formatEther(lpToken)
        })
        console.log("token Adr:", token.address)
        console.log("address of signer:", signer.address)
        }catch(error){
            console.log(error)
        }
        }
    }
            const getDecimals = async ()=>{
            if(token.address === "0x0000000000000000000000000000000000000000"){
                return 18
            }else{
                const erc20 = new  ethers.Contract(token.address, ["function decimals()view returns(uint8)"], signer)
            return await erc20.decimals();
            }
        }
    const remove = async()=>{
    const toastId = toast.loading("Position removing...")
        try{
       const decimalIn = await getDecimals(token.address)
        const removeLiq = await dexContract.removeLiquidity(token.address, ethers.parseEther(removeAmount, decimalIn))
        await removeLiq.wait()
        toast.update(toastId,{
            render: "Position Removed Successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000
        })
        }catch(err){
            toast.update(toastId,{
            render: "Failed to Remove Position",
            type: "error",
            isLoading: false,
            autoClose: 3000
        })
         console.log("error:", err)
        }

    }
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0a12] via-[#1f1627] to-[#0d0a12] p-6">
        <div className="max-w-xl mx-auto space-y-8">
          {/* — SELECT TOKEN CARD — */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md border border-purple-600 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Select Token Position
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              Choose the token you want to manage
            </p>
            <button
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white transition"
              onClick={() => {
                setShowModal(true);
                setModalTitle("Token");
              }}
            >
              {token?token.symbol:"Select Token"}
            </button>
          </div>
  
          {/* — VIEW POSITION — */}
          {token && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white bg-opacity-10 backdrop-blur-md border border-purple-400 rounded-2xl p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Your Position in {token.symbol}
              </h3>
              <button
                className="w-full py-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white transition disabled:opacity-50"
                onClick={() =>
                  isConnected ? viewLiq() : toast.error("Wallet not connected")
                }
              >
                View Position
              </button>
  
              {liquidityInfo && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-200">
                  <div>
                    <p className="text-sm">Your Deposits</p>
                    <p className="font-semibold text-white">
                      {liquidityInfo.userAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Pool Size</p>
                    <p className="font-semibold text-white">
                      {liquidityInfo.totalPool}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">LP Tokens</p>
                    <p className="font-semibold text-white">
                      {liquidityInfo.lpToken}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
  
          {/* — REMOVE LIQUIDITY — */}
          {token && liquidityInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white bg-opacity-10 backdrop-blur-md border border-red-400 rounded-2xl p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Remove Liquidity
              </h3>
              <label className="block text-gray-300 text-sm mb-1" htmlFor="remove">
                Amount to Remove
              </label>
              <input
                id="remove"
                type="number"
                value={removeAmount}
                onChange={(e) => setRemoveAmount(e.target.value)}
                placeholder="0.0"
                className="w-full mb-4 px-3 py-2 rounded-lg bg-white bg-opacity-20 placeholder-gray-400 focus:outline-none"
              />
              <button
                className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white transition disabled:opacity-50"
                onClick={remove}
                // disabled={!removeAmount}
              >
                Remove Position
              </button>
            </motion.div>
          )}
  
          <TokenSelectorModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={title}
            onSelect={(token) => setSelectToken(token)}
            network={network}
            setNetwork={setNetwork}
          />
        </div>
      </div>
    );
}

    export default ViewLiquidity
