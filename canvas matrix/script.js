var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particlesArray = []
var fontsize = 24
var str = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをん"
ctx.font = fontsize + "px Arial"

var count = 200

var fb = document.getElementById("fb")
fb.width = window.innerWidth
fb.height = window.innerHeight
var ctxfb = fb.getContext("2d")
for (var i = 0; i < fb.height; i += 3) {
    ctxfb.moveTo(0, i)
    ctxfb.lineTo(canvas.width, i)
    ctxfb.stroke()
}
class Particle {
    constructor() {
        this.x = (Math.random() * (canvas.width / 24) | 0) * 24
        this.y = Math.random() * canvas.height
        this.size = fontsize
    }
    update() {
        this.y += this.size
    }
    draw() {
        ctx.fillStyle = "green"
        ctx.fillText(str[Math.random() * str.length | 0], this.x, this.y)
    }
}

function init() {
    for (var i = 0; i < count; i++) {
        particlesArray.push(new Particle())
    }
}
init()

function draw() {
    ctx.globalAlpha = 0.1
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].y > canvas.height) {
            particlesArray[i].y = 0
            particlesArray[i].x = (Math.random() * (canvas.width / 24) | 0) * 24
        }
    }
}
setInterval(draw, 100)