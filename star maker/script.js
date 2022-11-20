var canvas=document.getElementById("canvas")
    canvas.width=600
    canvas.height=600
var ctx = canvas.getContext("2d")
var radius = document.getElementById("radius")
var inset = document.getElementById("inset")
var shapes = document.getElementById("shapes")
var fillcolor = document.getElementById("fillcolor")
var infos = document.getElementsByClassName("info")[0].children
function draw(radius,inset,n,c){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save()
    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.beginPath()
    ctx.fillStyle="hsl("+c+",80%,50%)"
    ctx.strokeStyle="hsl("+c+",80%,50%)"
    console.log("hsl("+c+",80%,50%)")
    ctx.moveTo(0,-radius)
    var count = n
    for(var i=0;i<n;i++){
        ctx.rotate(Math.PI*2/count/2)
        ctx.lineTo(0,-inset)
        ctx.rotate(Math.PI*2/count/2)
        ctx.lineTo(0,-radius)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    ctx.restore()
    infos[0].innerHTML="外径:"+radius
    infos[1].innerHTML="内径:"+inset
    infos[2].innerHTML=n + " 角星"
    infos[3].innerHTML="色轮值:"+c+"deg"
}
draw(radius.value,inset.value,shapes.value,fillcolor.value)
Array.prototype.forEach.call(document.getElementsByTagName("input"),function(eve){
    eve.addEventListener("input",function(){
        draw(radius.value,inset.value,shapes.value,fillcolor.value)
    })
})

