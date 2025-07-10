function HoverBox({address}){
    return(
        <div className="relative  group inline-block">
        <div className="text-xs absolute top-full left-1/2 rounded transition-opacity duration-100 z-50 bg-gray-500 text-white text-center opacity-0 group-hover:opacity-100 shadow-lg px-3 py-1" onClick={()=> navigator.clipboard.writeText(swap.to)}>
            Click to copy full address
    <br />
    {address}
        </div>
        </div>
    )
}
export default HoverBox