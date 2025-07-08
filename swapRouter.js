import mongoose from "mongoose"


const newSchema = mongoose.Schema({
    from: String,
    to: String,
    amount: String,
    received: String,
    tokenIn: String,
    tokenOut: String,
    timestamp: {type: Date, default: Date.now(),    
    }
})
const Swap = mongoose.model('swap', newSchema)
export default Swap