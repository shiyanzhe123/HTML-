let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let particleArray = []
let rings = []
let count = 0
ctx.font = "20px sans-serif"
let mouse = {
    x: 0,
    y: 0
}
class ring {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 50 | 0
    }
    update() {
        this.size = this.size - 0.2
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, 0)
        ctx.strokeStyle = "hsl(" + (this.size / 50 * 360 | 0) + "deg,80%,50%)"
        ctx.stroke()
    }
}
class particle {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.vx = Math.random() - 0.5
        this.vy = -Math.random() * 0.5 - 0.5
        this.ex = 100
        this.ey = 100
        this.color = color
        this.act = "exp"
    }
    update() {
        if (this.act == "exp") {
            this.x += this.vx * 3
            this.y += this.vy * 3
            this.vy += 0.02
            if (this.vy > 1) {
                this.act = "run"
            }
        } else {
            this.x -= (this.x - this.ex) / 50
            this.y -= (this.y - this.ey) / 50
        }
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, 0)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
document.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white"
    ctx.fillText(count, 70, 40)
    ctx.strokeStyle = "white"
    ctx.strokeRect(70, 50, 60, 100)
    ctx.fillStyle = "rgba(255,0,0,0.5)"
    ctx.fillRect(71, 149, 58, -count / 10000 * 98)
    if (rings.length < 10) {
        rings.push(new ring())
    }
    for (var i = 0; i < particleArray.length; i++) { //绘制粒子
        var p = particleArray[i]
        p.update()
        p.draw()
        if (p.x < 130 && p.y < 150) {
            particleArray.splice(i, 1)
            if (count < 10000) {
                count++
            }
        }
    }
    for (var i = 0; i < rings.length; i++) { //绘制圆圈
        var r = rings[i]
        if (r.size > 1) {
            if (Math.sqrt(Math.pow(r.x - mouse.x, 2) + Math.pow(r.y - mouse.y, 2)) < r.size) {
                var color = "hsl(" + (r.size / 50 * 360 | 0) + "deg,80%,50%)"
                for (var j = 0; j < 50 - r.size; j++) {
                    particleArray.push(new particle(r.x, r.y, color))
                }
                rings.splice(i, 1)
            }
            r.update()
            r.draw()
        } else {
            rings.splice(i, 1)
        }
    }
}
setInterval(draw, 10);