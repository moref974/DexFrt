import React from "react";
import bluvex from "../image/Bluvex.png"
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
function NavBar(){
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const value = e.target.value
    if(value === "addLiquidity"){
     navigate("AddLiquidity")
    }else if(
        value === "ViewLiquidity"
    ){
        navigate("ViewLiquidity")
    }
    }
    return(
    <nav className="bg-gradient-to-br from-[#1a0023] via-[#1f0034] to-[#0e001b] border border-pink-500/30 shadow-[0_0_30px_#ec489966] px-2 py-0.5 flex justify-between">
        <div className="flex items-center">
            <img src={bluvex} className="h-12 w-12"/>  
            <div className="max-w-7xl font-sans text-left text-blue-500 text-lg font-bold px-2 py-3 hover:cursor-pointer" title="BluVex" onClick={()=> navigate("swap")}>Bluvex</div>
            <div className="ml-4">
                <select onChange={handleChange} defaultValue="" className="bg[#1f0034] text-purple-400 borde bg-transparent rounded animate-pulse px-2 py-1 text-sm outline-none hover:text-pink- cursor-pointer">f
                <option value="" disabled className="bg-transparent">Positions</option>
                <option value="addLiquidity" className="bg-transparent">New Position</option>
                <option value="ViewLiquidity" className="bg-transparent">View Position</option>
                </select>
            </div>
        </div>
        <div className="connect-button mt-1" title="Connect a wallet">
        <ConnectButton/>
        </div>
    </nav>
    )
}

export default NavBar