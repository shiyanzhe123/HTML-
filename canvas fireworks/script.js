var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var fireworksArray = []
var particlesArray = []
class Particle {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.c = color
        this.vx = (0.5 - Math.random()) * 100
        this.vy = (0.5 - Math.random()) * 100
        this.c = color
        this.age = Math.random() * 100 | 0
    }
    update() {
        this.x += this.vx / 20
        this.y += this.vy / 20
        this.vy++
            this.age--
    }
    draw() {
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.fillStyle = this.c
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx.fill()
    }
}
class Firework {
    constructor() {
        this.y = canvas.height
        this.x = Math.random() * canvas.width | 0
        this.vel = -(Math.random() * Math.sqrt(canvas.height) / 3 + Math.sqrt(4 * canvas.height) / 2) / 5
        this.c = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
    }
    update() {
        this.y += this.vel
        this.vel += 0.04
        if (this.vel >= 0) {
            for (var i = 0; i < 200; i++) {
                particlesArray.push(new Particle(this.x, this.y, this.c))
            }
            this.y = canvas.height
            this.x = Math.random() * canvas.width | 0
            this.vel = -(Math.random() * Math.sqrt(canvas.height) / 3 + Math.sqrt(4 * canvas.height) / 2) / 5
            this.c = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
        }
    }
    draw() {
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.fillStyle = this.c
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fill()
    }
}

function init_fireworks() {
    for (var i = 0; i < (canvas.width / 200 | 0); i++) {
        fireworksArray.push(new Firework)
    }

}
init_fireworks()

function draw() {
    ctx.globalAlpha = 0.1
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < fireworksArray.length; i++) {
        fireworksArray[i].update()
        fireworksArray[i].draw()
    }
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].age < 0) {
            particlesArray.splice(i, 1)
        }
    }
    requestAnimationFrame(draw)
}
draw()