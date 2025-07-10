import { toast } from "react-toastify";
import {Copy} from "lucide-react"
function CopyAd({address}){

 return(
    <div>
<Copy size={16} className="text-gray-400 hover:text-white cursor-pointer" onClick={()=> {navigator.clipboard.writeText(address); toast.success("Address copied to clipboard")}}></Copy>
    </div>
 )
}
export default CopyAd
