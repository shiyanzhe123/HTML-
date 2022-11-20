let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let stars = []
class star {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0
        this.r = Math.random() * 10 + 10
        this.deg = Math.random() * 360 | 0
        this.c = (Math.random() * 5 | 0) + 5
        this.vx = Math.random() - 0.5
        this.vy = Math.random() + 0.5
    }
    update() {
        this.deg++
        this.x += this.vx
        this.y += this.vy
    }
    draw() {
        ctx.beginPath()
        let sp = dp(this.x, this.y, this.r, this.deg)
        ctx.moveTo(sp[0], sp[1])
        for (var i = 0; i < this.c; i++) {
            let sp1 = dp(this.x, this.y, this.r, i / this.c * 360 + this.deg)
            let sp2 = dp(this.x, this.y, this.r / 2, i / this.c * 360 + 1 / this.c * 180 + this.deg)
            ctx.lineTo(sp1[0], sp1[1])
            ctx.lineTo(sp2[0], sp2[1])
        }
        ctx.closePath()
        ctx.fillStyle = "rgba(255,255,255," + (this.vy - 0.5) + ")"
        ctx.fill()
    }
}
function dp(x, y, r, d) {
    let x1 = r * Math.cos(d * Math.PI / 180) + x
    let y1 = r * Math.sin(d * Math.PI / 180) + y
    return [x1, y1]
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (i in stars) {
        stars[i].update()
        stars[i].draw()
        if (stars[i].y > canvas.height) {
            stars.splice(i, 1)
        }
    }
    if (stars.length < 100) {
        stars.push(new star())
    }

}
setInterval(draw, 10)