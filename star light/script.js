let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let points = []
let r1 = 100
let r2 = 50
let particles = []

class particle {
    constructor(x, y) {
        this.deg = Math.atan2((y - canvas.height / 2), (x - canvas.width / 2))
        this.r = Math.sqrt(Math.pow((y - canvas.height / 2), 2) + Math.pow((x - canvas.width / 2), 2))
        this.age = Math.random() * canvas.width / 2
        this.color = "hsl(" + Math.random() * 360 + ",80%,60%)"
    }
    update() {
        this.r += 2
        this.age--
    }
    draw() {
        let x1 = this.r * Math.cos(this.deg) + canvas.width / 2
        let y1 = this.r * Math.sin(this.deg) + canvas.height / 2
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(x1, y1, 2, 0, Math.PI * 2, 0)
        ctx.fill()
    }
}
function init() {
    for (let i = 0; i < 5; i++) {
        let deg = -90 + i * 72
        let x1 = r1 * Math.cos(deg * Math.PI / 180) + canvas.width / 2
        let y1 = r1 * Math.sin(deg * Math.PI / 180) + canvas.height / 2
        points.push([x1, y1])
        deg = deg + 36
        let x2 = r2 * Math.cos(deg * Math.PI / 180) + canvas.width / 2
        let y2 = r2 * Math.sin(deg * Math.PI / 180) + canvas.height / 2
        points.push([x2, y2])
    }
}
init()
function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (particles.length < 800) {
        for (let i = 0; i < 100; i++) {
            let s = Math.random() * 10 | 0
            let p1 = points[s]
            let p2 = points[(s + 1) % 10]
            let px = Math.random() * (p2[0] - p1[0]) + p1[0]
            let py = (px - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1]
            particles.push(new particle(px, py))
        }
        ctx.beginPath()
        for (let i in points) {
            let p = points[i]
            ctx.lineTo(p[0], p[1])
        }
        ctx.closePath()
        ctx.fillStyle = "hsl(" + Math.random() * 360 + ",80%,60%)"
        ctx.fill()
    }
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (p.age < 0) {
            particles.splice(i, 1)
        }
    }

}
setInterval(draw, 1000 / 60);