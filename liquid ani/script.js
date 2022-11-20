let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let balls = []
ctx.fillStyle = "white"
class ball {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = Math.random() * 50 + 30
        this.speed = 1 - this.radius / 90
        this.vx = (Math.random() - 0.5) * this.speed * 5
        this.vy = (Math.random() - 0.5) * this.speed * 5
    }
    update() {
        this.x += this.vx
        this.y += this.vy
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, 0)
        ctx.fill()
    }
}

function init() {
    for (var i = 0; i < 50; i++) {
        balls.push(new ball())
    }
}
init()

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (var i in balls) {
        let b = balls[i]
        b.update()
        b.draw()
        if (b.x < b.radius || b.x > canvas.width - b.radius) {
            b.vx = -b.vx
        }
        if (b.y < b.radius || b.y > canvas.height - b.radius) {
            b.vy = -b.vy
        }
    }
}
setInterval(animation, 1000 / 60)