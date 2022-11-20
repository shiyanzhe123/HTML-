let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let particlesArray = []
class particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        // 方形扩展
        // this.vx = 0.5 - Math.random()
        // this.vy = 0.5 - Math.random()
        // 圆形扩展
        this.deg = Math.random() * 360
        this.r = Math.random()
        this.vx = this.r * Math.cos(this.deg * Math.PI / 180)
        this.vy = this.r * Math.sin(this.deg * Math.PI / 180)
        this.age = Math.random() * 250 | 0
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.age--
    }
    draw() {
        ctx.fillStyle = "#1e90ff"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, 0)
        ctx.fill()
    }
}
document.addEventListener("click", function (evt) {
    for (var i = 0; i < 200; i++) {
        particlesArray.push(new particle(evt.x, evt.y))
    }
})

function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height) //完全清屏
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var i in particlesArray) {
        var p = particlesArray[i]
        p.update()
        p.draw()
        if (p.age < 0) {
            particlesArray.splice(i, 1)
        }
    }
}
setInterval(draw, 10)