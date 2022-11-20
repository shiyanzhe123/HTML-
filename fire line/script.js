let canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 800
let ctx = canvas.getContext("2d")
let r1 = 380
let r2 = 190
let r3 = 180
let points = []
let particlesArray = []
class particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = Math.random()
        this.d = Math.random()
        this.vx = this.r * Math.cos(this.d * Math.PI * 2)
        this.vy = this.r * Math.sin(this.d * Math.PI * 2)
        this.age = Math.random() * 100 | 0 + 100
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.01
        this.age--
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, 0)
        ctx.fillStyle = "yellow"
        ctx.fill()
    }
}
function init() {
    for (var t = 0; t < 360; t += 0.2) {
        let x = (r1 - r2) * Math.cos(t * Math.PI / 180) + canvas.width / 2
        let y = (r1 - r2) * Math.sin(t * Math.PI / 180) + canvas.height / 2
        t0 = -t * Math.PI / 180 * r1 / r2
        let x1 = r3 * Math.cos(t0) + x
        let y1 = r3 * Math.sin(t0) + y
        points.push([x1, y1])
    }
}
init()
let ind = 0
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let p = points[ind]
    ctx.beginPath()
    ctx.arc(p[0], p[1], 3, 0, Math.PI * 2, 0)
    ctx.fillStyle = "white"
    ctx.fill()
    particlesArray.push(new particle(p[0], p[1]))
    for (var i in particlesArray) {
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].age < 0) {
            particlesArray.splice(i, 1)
        }
    }
    for (var i = 0; i < 500; i++) {
        li = points[(i + ind) % points.length]
        ctx.beginPath()
        ctx.arc(li[0], li[1], 1, 0, Math.PI * 2, 0)
        ctx.fillStyle = "rgba(255,255,255," + (1 - i / 500) + ")"
        ctx.fill()
    }
    ind++
    ind = ind % points.length
}
setInterval(draw, 1)