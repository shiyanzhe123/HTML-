let canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)
canvas.style.zIndex = "-1"
let ctx = canvas.getContext("2d")
let particleArray = []
class particle {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.tx = 0
        this.ty = 0
        this.r = (Math.random() * 6 | 0) * 60
        this.age = 0
    }
    update() {
        this.x += this.tx
        this.y += this.ty
        this.age++
            if (this.age == 60) {
                let deg = Math.random() * 4 | 0 + 1
                this.r += 60 * deg + 240
                this.tx = Math.cos(this.r * Math.PI / 180)
                this.ty = Math.sin(this.r * Math.PI / 180)
                this.age = 0
            }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = canvas.width / 2
            this.y = canvas.height / 2
            this.age = 0
            this.r = (Math.random() * 6 | 0) * 60
            this.tx = 0
            this.ty = 0
        }
    }
    draw() {
        ctx.fillStyle = "rgba(30, 144, 255,0.2)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, 0)
        ctx.fill()
    }
}
for (var i = 0; i < 200; i++) {
    particleArray.push(new particle())
}

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var i in particleArray) {
        var p = particleArray[i]
        p.update()
        p.draw()
    }
}
setInterval(draw, 1)