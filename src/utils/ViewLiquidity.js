import { useAppContext } from "../context/AppContext"
import { useAccount } from "wagmi"
import {ethers} from "ethers"
import TokenSelectorModal from "./TokenSelector"
import { useState } from "react"
import { toast } from "react-toastify"
function ViewLiquidity (){
    const {signer, dexContract} = useAppContext()
    const [showModal, setShowModal] = useState(false)
    const [title, setModalTitle] = useState("")
    const [removeLiqAmount, setRmoveLiqAmount] = useState("")
    const [loading, setLoading] = useState(false)
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
        const removeLiq = await dexContract.removeLiquidity(token.address, ethers.parseEther(removeLiqAmount, decimalIn))
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
return(
        <div className="w-full min-h-screen px-4 py-10 overflow-x-hidden bg-gradient-to-br from-black via-[#120019] to-black border border-purple-500" >
         <div className="">
          <button className="bg-purple-400 hover:bg-purple-500 w-32 rounded-xl" onClick={()=> {setShowModal(true); setModalTitle("Token")}}>Select Token</button>
         </div>
         {token &&(
            <div className="w-full flex flex-col justify-start items-center ">
                <div className="max-w-md p-4 border border-purple-300">
                 <button className="bg-blue-400 text-white" onClick={viewLiq} disabled={loading}>{loading?"Loading...":"View Position"}</button>
                </div>
                {liquidityInfo && (
                    <div className=" w-full">
                    <p className="text-white"><strong className="text-white">Your Deposits: </strong>{liquidityInfo.userAmount}</p>
                    <p className="text-white"><strong className="text-white">Pool Size: </strong>{liquidityInfo.totalPool}</p>
                </div>
                )}
                {liquidityInfo &&(
                <p className="text-white hover:text-red-600 fixed top-24 right-4"><strong className="text-white">Lp Tokens: </strong>{liquidityInfo.lpToken}
                </p>
                )}
            </div>
         )}
         {token &&(
           <div>
            <div>
                <input type="text" placeholder="0.0$" onChange={(e)=> setRmoveLiqAmount(e.target.value)}/>
                <button onClick={remove}></button>
            </div>
            <button className="bg-blue-200 text-white" onClick={remove}>Remove Position</button>
         </div>
         )}
         {
         <TokenSelectorModal 
          isOpen={showModal}
          onClose={()=>setShowModal(false)}
          title={title}
          onSelect={(token)=>{
            if(title === "Token"){
                setSelectToken(token)
            }
          }}
          setNetwork={setNetwork}
          network={network}
         />}
        </div>
    )
}

    export default ViewLiquidity