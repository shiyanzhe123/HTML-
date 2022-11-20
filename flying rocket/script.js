var main=document.getElementById("main")
var deg=0
var ex=0
var ey=0
var vx =0
var vy =0
var count=0
window.addEventListener("mousemove",function(evt){
    ex = evt.x - main.offsetLeft-main.clientWidth/2
    ey = evt.y - main.offsetTop-main.clientHeight/2
    deg = 360*Math.atan(ey/ex)/(2*Math.PI) +45
    if(ex <0){
        deg+= 180
    }
    count = 0
})
function draw(){
    main.style.transform="rotate("+deg+"deg)"
    if(count < 100){
        vx += ex/100
        vy += ey/100
    }
    main.style.left = vx + "px"
    main.style.top = vy +"px"
    console.log(ex,ey)
    count++
   
}
setInterval(draw,1)