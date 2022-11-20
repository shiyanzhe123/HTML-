let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let w = window.innerWidth
let h = window.innerHeight
canvas.width = w
canvas.height = h
let lines = []
let particles = []
let deg = 0
class line {
    constructor(d) {
        this.d = d
        this.r = 0
        this.l = Math.random() * 50 + 50 + this.r
        this.color = "hsl(" + Math.random() * 360 + ",80%,60%)"
        this.speed = Math.random() * 2 + 2
    }
    update() {
        this.r += this.speed
        this.l += this.speed
    }
    draw() {
        let x1 = this.r * Math.cos(this.d * Math.PI / 180) + w / 2
        let y1 = this.r * Math.sin(this.d * Math.PI / 180) + h / 2
        let x2 = this.l * Math.cos(this.d * Math.PI / 180) + w / 2
        let y2 = this.l * Math.sin(this.d * Math.PI / 180) + h / 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.stroke()
    }
}
class particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = Math.random() - 0.5
        this.vy = Math.random() - 0.5
        this.age = Math.random() * w / 2
        this.color = "hsl(" + Math.random() * 360 + ",80%,60%)"
        this.size = Math.random() * 5
    }
    update() {
        this.age--
        this.x += this.vx
        this.y += this.vy
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, 0)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
function draw() {
    ctx.clearRect(0, 0, w, h)
    deg += 2
    lines.push(new line(deg))
    lines.push(new line(deg + 180))
    for (let i in lines) {
        let l = lines[i]
        l.update()
        l.draw()
        if (l.r > Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2))) {
            lines.splice(i, 1)
        }
    }
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (p.age < 0) {
            particles.splice(i, 1)
        }
    }
    particles.push(new particle(w / 2, h / 2))
}
setInterval(draw, 1000 / 60)