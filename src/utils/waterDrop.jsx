import anime from "animejs";
const WaterGrid = ()=>{
return(
    <div className=" absolute inset-0 -z-10 grid h-screen place-content-center px-8"><DoGrid/></div>
)
}
const Grid_Width = 60;
const Grid_Height  = 30
const DoGrid = ()=>{
    const handleDot = (e, any)=>{
        anime({
            targets:".dot-point",
            scale:[
                {value:1.35, easing:"easeOutSine", duration: 250},
                {value:1, easing:"easeInOutQuad", duration: 500}
            ],
            translateY:[
                {value:-15, easing:"easeOutSine", duration: 250},
                {value:0, easing:"easeInOutQuad", duration: 500}
            ],
            opacity:[
                {value:1, easing:"easeOutSine", duration: 250},
                {value:0.5, easing:"easeInOutQuad", duration: 500}
            ],
            delay: anime.stagger(100,{
                grid: [Grid_Width, Grid_Height ],
                from: parseInt(e.target.dataset.index) || 0
            })
        })
    }
    const dots = [];
    let index = 0;

    for(let j = 0; j< Grid_Height ;j++){
    for(let i = 0; i< Grid_Width; i++){
        dots.push(
            <div onMouseEnter={handleDot} className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"data-index={index} key={`${i}-${j}`}>
            <div className="dot-point w-1 h-1  rounded-e-full bg-gradient-to-b from-purple-700 to-red-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white" data-index={index} />
            </div>
        )
        index++
    }
    }
    return(
  <div style={{gridTemplateColumns: `repeat(${Grid_Width},1fr)`}} className="grid w-fit">{dots}</div>
    )
}

export default WaterGrid