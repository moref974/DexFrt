import express from "express"
const app = express()
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import Swap from "./src/components/Swap"
dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MongoUri).then(()=>
    console.log("Md Connected")
).catch((err)=>
    console.error("Db Not Conncected", err)
)

const newSchema = new mongoose.Schema({
    from: String,
    to: String,
    amount: String,
    received: String,
    timestamp: {type: Date, default: Date.now()}
})
const swap = mongoose.model('swap', newSchema)
app.post("/api/swap", async(req, res)=>{
    const {from, to, amount, received} = req.body
    try{
    const Swap = new swap({from, to, amount, received})
    await Swap.save()
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

app.get("/api/prices", async(req,res)=>{
    const ids = req.query.ids || "ethereum,bitcoin,theater,binancecoin"
    try{
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`)
    const data = await response.json()
    res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to fetch price"})
    }

})

app.listen(5000, ()=>{
  console.log('Server running on port 5000');
})
