import { useNavigate } from "react-router-dom";
export default function SecondPage() {
  const navigate = useNavigate();
  return (
   <div className="justify-start flex items-center">
   <button
      className="w-20 mx-auto border animate-pulse border-purple-500 rounded-sm bg-transparent hover:animate-pulse text-blue-400 "
      onClick={()=> navigate("/AddLiq")}
    >
      Next
    </button>
   </div>
  );
}
