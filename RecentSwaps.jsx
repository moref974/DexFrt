  const [recentSwaps, setRecentSwaps] = useState([]);
  const approveAndSwap = async () => {
    if (!dexContract) {
      alert("Contract is still undefined, please wait until contracts load.");
      return;
    }

    if (!tokenIn.address || !tokenOut.address || !amountIn || !minAmountOut) {
      alert("Please fill all swap inputs first.");
      return;
    }
    const decimalIn = await getDecimal(tokenIn);
    const amountParsed = ethers.parseUnits(amountIn, decimalIn);
    try {
      const tokenContract = new ethers.Contract(
        tokenIn,
        [
          "function approve(address sender, uint256 amount)public returns(bool)",
        ],
        signer
      );
      const approveTx = await tokenContract.approve(
        dexContract.address,
        amountParsed
      );
      await approveTx.wait();
      const tx = await dexContract.swap(
        tokenIn.address,
        tokenOut.address,
        amountParsed,
        ethers.parseUnits(minAmountOut, decimalIn)
      );
      await tx.wait();

      const fetch =  await fetch("http://5000/api/swap",{
        method: POST,
        headers: ("Content-Type", "application/json"),
        body: JSON.stringify({
            from: tokenIn.address,
            to: tokenOut.address,
            amount: amountParsed
        })
      })
     useEffect(()=>{
     const fetchSwap =  async()=>{
        const fet = await fetch("http://localhost/api/swaps")
        const data = await fet.json()
        setRecentSwaps(data)
     }
     fetchSwap()
    },[])
      alert("Swap successful!");
    } catch (error) {
      console.error("Swap failed:", error);
      alert("Swap failed. Check console.");
    }
  };
import React, {useEffect, useState} from "react"
  const RecentSwaps = ({ fromToken, toToken, amount})=>{
    return(
        <div className="flex w-full justify-between items-center border border-purple-500">
         <table>
            <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                </tr>
                <tbody>
                    <tr>
                        <th>{add}</th>
                    </tr>
                </tbody>
            </thead>
         </table>
        </div>
    )
  }