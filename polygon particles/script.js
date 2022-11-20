let canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.zIndex = "-1"
document.body.appendChild(canvas)
let ctx = canvas.getContext("2d")
let particles = []
let count = canvas.width * canvas.height / 10000
class particle {
    constructor() {
        this.r = Math.random() * 15 | 0 + 30
        this.x = Math.random() * (canvas.width - this.r * 2) + this.r
        this.y = Math.random() * (canvas.height - this.r * 2) + this.r
        this.d = Math.random() * 360 | 0
        this.h = Math.random() * 6 | 0 + 3
        this.vx = Math.random() - 0.5
        this.vy = Math.random() - 0.5
        let c = getcolor()
        this.color = "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0.2)"
    }
    update() {
        this.x += this.vx * 2
        this.y += this.vy * 2
        this.d += 2
    }
    draw() {
        ctx.beginPath()
        for (let i = 0; i < this.h; i++) {
            let d = this.d + i * (360 / this.h)
            let x = this.r * Math.cos(d * Math.PI / 180) + this.x
            let y = this.r * Math.sin(d * Math.PI / 180) + this.y
            ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = "gray"
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.stroke()
    }

}
function getcolor() {
    let r = Math.random() * 255 | 0
    let g = Math.random() * 255 | 0
    let b = Math.random() * 255 | 0
    return [r, g, b]
}
function init() {
    for (let i = 0; i < count; i++) {
        particles.push(new particle())
    }
}
init()
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (p.x < p.r || p.x > canvas.width - p.r) {
            p.vx = -p.vx
        }
        if (p.y < p.r || p.y > canvas.height - p.r) {
            p.vy = -p.vy
        }
    }

}
setInterval(draw, 1000 / 60)