import { useState } from "react";
import { toast } from "react-toastify";

function Copy({address}){
    const [copy, setCopied] = useState(false)
 const handleCopy = async ()=>{
 navigator.clipboard.writeText(address);
 setCopied(true);
toast.success("Address copied to clipboard")
 setTimeout(()=> setCopied(false),1500)
 }
 return(
    <div>
    <button onClick={handleCopy} className="text-xs bg-transparent text-white hover:text-purple-100 px-2 py-1" title="Copy Address">🗐</button>
    </div>
 )
}
export default Copy