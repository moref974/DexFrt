import React from "react";
import bluvex from "../image/Bluvex.png"
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
function NavBar(){
    const navigate = useNavigate()
    const {isConnected} = useAccount()
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
    return (
  <nav className="bg-gradient-to-br from-[#1a0023] via-[#1f0034] to-[#0e001b]  shadow-[0_0_30px_#ec489966] px-4 py-2">
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
      {/* Left Side */}
      <div className="flex flex-wrap items-center gap-4">
        <img src={bluvex} className="h-10 w-10 rounded-full" alt="BluVex Logo" />

        <div
          className="font-sans text-blue-400 -ml-5 text-lg font-bold cursor-pointer hover:text-pink-400 transition"
          title="BluVex"
          onClick={() => navigate("swap")}
        >
          BluVex
        </div>

        <select
          onChange={handleChange}
          defaultValue=""
          className="bg-[#1f0034] appearance-none text-purple-300 mt-1 rounded px-2 py-1 text-sm outline-none  cursor-pointer"
        >
          <option value="" disabled hidden>
            Positions
          </option>
          <option value="addLiquidity">New Position</option>
          <option value="ViewLiquidity">View Position</option>
        </select>

        <div
          className="text-purple-300 -ml-10 mt-1 text-sm cursor-pointer hover:text-pink-400 transition"
          onClick={() => navigate("Pool")}
        >
          Pool
        </div>
      </div>

      {/* Right Side: Wallet Button */}
      <div className="w-32 sm:w-full md:w-auto">
        <div className={`flex ${!isConnected ? "mr-0 -ml-0" : ""} justify-start sm:mr-0 sm:-ml-0 mr-8 -ml-10 text-xs sm:text-sm`}>
          <ConnectButton />
        </div>
      </div>
    </div>
  </nav>
);
}

export default NavBar