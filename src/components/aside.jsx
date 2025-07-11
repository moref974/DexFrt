import { useNavigate } from "react-router-dom"
function Aside(){
    const navigate = useNavigate()
    const handelSelect = async(e)=>{
        const value = e.target.value
        if(value === "addLiquidity"){
            navigate("AddLiquidity")
        }else if(value === "ViewLiquidity"){
            navigate("ViewLiquidity")
        }else{
            navigate("Pool")
        }
    }
    return(
        <div>
            <select onChange={handelSelect}
            defaultValue=""
            className="bg-[#1f0034] appearance-none text-purple-400 cursor-pointer px-2 py-1 text-sm"
            >
            <option value="" disabled hidden>
            Positions
          </option>
          <option value="addLiquidity" >New Position</option>
          <option value="ViewLiquidity">View Position</option>
        <option>
          Pool
        </option>
            </select>
        </div>
    )
}
export default Aside
