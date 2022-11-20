var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")

var mouse = {
    x: 0,
    y: 0
}
var particlesArray = []

canvas.addEventListener("mousemove", function(evt) {
    mouse.x = evt.clientX
    mouse.y = evt.clientY
})
var count = 30
class Particle {
    constructor(radius, speed, size) {
        this.r = radius
        this.x = 0
        this.y = 0
        this.d = Math.random() * 360
        this.s = speed
        this.c = "hsl(" + (Math.random() * 360 | 0) + ",80%,50%)"
        this.size = size
    }
    update() {
        this.d += this.s
        this.x = mouse.x + this.r * Math.cos((this.d % 360) * Math.PI / 180)
        this.y = mouse.y + this.r * Math.sin((this.d % 360) * Math.PI / 180)
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.c
        ctx.globalAlpha = 1
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

function init() {
    for (var i = 0; i < count; i++) {
        particlesArray.push(new Particle(i * 5 + 50, Math.random() + 1, Math.random() * 2 + 1))
    }
}
init()

function animate() {
    ctx.globalAlpha = 0.1
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < count; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
    }
    requestAnimationFrame(animate)
}
animate()