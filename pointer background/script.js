let canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.filter = "blur(2px)"
canvas.style.zIndex = "-1"
let ctx = canvas.getContext("2d")
document.body.appendChild(canvas)
let particleArray = []
let move = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: Math.random() * 1 + 2,
    vy: Math.random() * 1 + 2
}
let mouse = {
    x: 0,
    y: 0
}
document.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
class particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 0
        this.es = 0
        this.color = "white"
    }
    update() {
        this.size -= (this.size - this.es) / 10
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, 0)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

function init() {
    for (var i = 0; i <= canvas.width / 30; i++) {
        for (var j = 0; j <= canvas.height / 30; j++) {
            particleArray.push(new particle(i * 30 + 10, j * 30 + 10))
        }
    }
}
init()

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    move.x += move.vx
    move.y += move.vy
    if (move.x > canvas.width - 200 || move.x < 200) {
        move.vx = -move.vx
    }
    if (move.y > canvas.height - 200 || move.y < 200) {
        move.vy = -move.vy
    }
    for (var i = 0; i < particleArray.length; i++) {
        var p = particleArray[i]
        var r = Math.sqrt(Math.pow(move.x - p.x, 2) + Math.pow(move.y - p.y, 2))
        var mr = Math.sqrt(Math.pow(mouse.x - p.x, 2) + Math.pow(mouse.y - p.y, 2))
        if (r < 200) {
            p.es = (200 - r) / 20 + 1
            p.color = "hsl(" + (r / 200 * 360 | 0) + ",80%,50%)"
        } else if (mr < 60) {
            p.es = (200 - mr) / 20 + 1
            p.color = "hsl(" + (mr / 200 * 360 | 0) + ",80%,50%)"
        } else {
            p.es = 0
        }
        p.update()
        p.draw()
    }
}
setInterval(draw, 10);