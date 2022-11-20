var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var cal = 200
var sx = 0
var particlesArray = []
var mouse={
    x:-200,
    y:-200
}
document.addEventListener("mousemove",function(evt){
    mouse.x = evt.x
    mouse.y = evt.y
})
class Particle {
    constructor() {
        this.opt=1
        this.x = 0
        this.vx = 2
        this.y = (Math.random() * (canvas.height - 60) + 30) | 0
        this.points = []
        // this.color = "hsl(" + (Math.random() * 360 | 0) + "deg,50%,50%)"
        this.color="white"
        for (var i = 0; i < (canvas.width / cal | 0) + 2; i++) {
            this.points.push(Math.random()) // [0,1]
        }
    }
    update() {
        var n = Math.sqrt(Math.pow(mouse.x-this.x,2)+Math.pow(mouse.y-this.y,2))
        if(n<200){
            // this.x += (this.vx/10)*(n/200)
            this.x+=this.vx
            ctx.fillStyle="rgba(255,255,255,"+(1-n/200)+")"
        }
        else{
            this.x += this.vx
            ctx.fillStyle="black"
        }
        

    }
    draw() {
        // ctx.fillStyle = this.color
        ctx.fillRect(this.x, check(this.points, this.x) * 0.05 * canvas.height + this.y, 2, 2)
    }
}

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < particlesArray.length; i++) {
        var particle = particlesArray[i]
        particle.update()
        particle.draw()
        if (particle.x > canvas.width) {
            particlesArray.splice(i, 1)
        }
    }
    if (particlesArray.length < 20000) {
        particlesArray.push(new Particle)
    }
}
setInterval(draw, 10);

function check(points, x) {
    var p0 = (x / cal) | 0
    var p1 = p0 + 1
    var vx1 = (x - p0 * cal) / cal * points[p0]
    var vx2 = (x - p1 * cal) / cal * points[p1]
    var tx = (x - p0 * cal) / cal
    var tx = 6 * Math.pow(tx, 5) - 15 * Math.pow(tx, 4) + 10 * Math.pow(tx, 3)
    var y = (1 - tx) * vx1 + tx * vx2
    return (y)
}