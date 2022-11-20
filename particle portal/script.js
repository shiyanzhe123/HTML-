var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particlesArray = []
var fireworks = []
var count = 0
var span = document.getElementsByTagName("span")[0]
ctx.strokeStyle = "white"
class Particle {
    constructor(d) {
        this.x = 0
        this.y = 0
        this.deg = d
        this.r = Math.random() * 2
    }
    update() {
        this.deg += this.r
        this.deg = this.deg % 360
        if (this.r < 200) {
            this.r += 0.2
            span.style.width = span.style.height = (this.r / 200) * 560 + "px"
        }
        this.x = this.r * (Math.cos(Math.PI * 2 * this.deg / 360)) + this.r * (Math.sin(Math.PI * 2 * this.deg / 360)) + canvas.width / 2
        this.y = this.r * (Math.cos(Math.PI * 2 * this.deg / 360)) - this.r * (Math.sin(Math.PI * 2 * this.deg / 360)) + canvas.height / 2
    }
    draw() {
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, 0)
        ctx.closePath()
        ctx.fill()
        if (fireworks.length < this.r * 10) {
            fireworks.push(new firework(this.x, this.y))
        }

    }
}
class firework {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = 0.5 - Math.random()
        this.vy = 0.5 - Math.random()
        this.age = Math.random() * 200

    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.005
        this.age--

    }
    draw() {
        ctx.fillStyle = "#f6e58d"
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.abs(this.age / 200 * 2), 0, Math.PI * 2, 0)
        ctx.closePath()
        ctx.fill()
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    for (var i = 0; i < fireworks.length; i++) {
        fireworks[i].update()
        fireworks[i].draw()

        if (fireworks[i].age < 0) {
            fireworks.splice(i, 1)
        }
    }

    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
    }

}

function init() {
    for (var i = 0; i < 100; i++) {
        particlesArray.push(new Particle(Math.random() * 360))
    }
}

init()
setInterval(draw, 5)