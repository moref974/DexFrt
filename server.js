import express from "express"
const app = express()
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import Swap from "./swapRouter.js"
dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MongoUri).then(()=>
    console.log("🛡️MDB Connected")
).catch((err)=>
    console.log("MDB Not Conncected")
)

app.post("/api/swap", async(req, res)=>{
    const {from, to, amount, received ,tokenIn, tokenOut} = req.body
    try{
    const newSwap = new Swap({from, to, amount, received,tokenIn, tokenOut})
    await newSwap.save()
    res.status(200).json({message:"Swap history created"})
    }catch(error){
        console.log("Failed to created Swap history")
        res.status(401).json({message:"Failed to created Swap history"})
    }
})

app.get("/api/swaps", async(req,res)=>{
    const swap = await Swap.find().sort({timestamp: -1}).limit(10)
    res.json(swap)
})

app.listen(5000, ()=>{
  console.log('Server running on port 5000');
})
