var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.fillStyle = "#ff4757"
var icons = []
class icon {
    constructor() {
        this.rotate = Math.random() * 360 | 0
        this.size = Math.random() * 50 | 0 + 10
        this.speed = Math.random() * 2 + 1
        this.x = Math.random() * canvas.width | 0
        this.y = 0
        this.opt = Math.random() + 1
    }
    update() {

        this.y += this.speed
        this.rotate++
            this.opt -= 0.005
    }
    draw() {
        ctx.fillStyle = "rgba(255, 71, 87," + this.opt + ")"
        ctx.font = this.size + "px Fontawesome"
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotate * Math.PI / 180)
        ctx.fillText("\uf004", -this.size / 2, this.size / 2)
        ctx.restore()

    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (icons.length < 50) {
        icons.push(new icon())
    }
    for (var i = 0; i < icons.length; i++) {
        icons[i].update()
        icons[i].draw()
        if (icons[i].y > canvas.height || icons[i].opt < 0) {
            icons[i].y = 0
            icons[i].opt = Math.random() + 1
        }
    }
}
setInterval(draw, 10)