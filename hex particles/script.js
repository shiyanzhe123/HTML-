var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particleArray = []
ctx.strokeStyle = "white"
class particle {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.p = 0
        this.vx = Math.random() - 0.5
        this.vy = Math.random() * 0.5 + 0.5
        this.age = Math.random() * 10 | 0 + 10
        this.r = Math.random() * 5 | 0 + 5
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.p += 0.05
    }
    draw() {
        var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 2)
        grad.addColorStop(0, "rgba(255,255,255,0)")
        grad.addColorStop(1, "rgba(255,255,255," + (1 - Math.abs(this.p - this.age) / this.age) + ")")
        ctx.fillStyle = grad
        ctx.beginPath()
        var m = Math.sqrt(0.75 * Math.pow(this.r * 2, 2))
        ctx.moveTo(this.x - this.r, this.y + m)
        ctx.lineTo(this.x + this.r, this.y + m)
        ctx.lineTo(this.x + this.r * 2, this.y)
        ctx.lineTo(this.x + this.r, this.y - m)
        ctx.lineTo(this.x - this.r, this.y - m)
        ctx.lineTo(this.x - this.r * 2, this.y)
        ctx.closePath()
        ctx.fill()
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (particleArray.length < 200) {
        particleArray.push(new particle())
    }
    for (var i = 0; i < particleArray.length; i++) {
        var p = particleArray[i]
        p.update()
        p.draw()
        if (p.p > p.age * 2) {
            particleArray.splice(i, 1)
        }
    }
    requestAnimationFrame(draw)
}
draw()