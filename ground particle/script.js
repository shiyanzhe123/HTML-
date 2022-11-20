var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particalesArray = []
class Particale {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height
        this.vx = (0.5 - Math.random()) * 4
        this.vy = -Math.random() * 5 - 10
        this.vel = this.vy
        this.size = 4
        this.color = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.1
        if (this.y > canvas.height) {
            this.vel = this.vel * 0.7
            this.vy = this.vel
            this.y = canvas.height
            this.size = this.size * 0.6

        }
        if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx
        }
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}


function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < particalesArray.length; i++) {
        particalesArray[i].update()
        particalesArray[i].draw()
        if (particalesArray[i].size < 0.5) {
            particalesArray.splice(i, 1)
        }
    }
    if (particalesArray.length < 2000) {
        particalesArray.push(new Particale)
    }

}
setInterval(draw, 10)