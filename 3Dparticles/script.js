let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let radius = 300
let particles = []
class particle {
    constructor(d, x, y, r) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.r = r
        this.d = d
        this.op = 1
        this.vx = x
        this.vy = y
    }
    update() {
        this.d += Math.PI / 360
        if ((this.d % Math.PI * 2) > Math.PI) {
            this.op = 1 - this.d % (Math.PI / 2) / (Math.PI / 2)
        } else {
            this.op = this.d % (Math.PI / 2) / (Math.PI / 2)
        }
        this.x += (this.vx - this.x) / 30
        this.y += (this.vy - this.y) / 30

    }
    draw() {
        let x = this.r * Math.cos(this.d) + this.x
        let y = this.r / 4 * Math.sin(this.d) + this.y
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0,0,0," + this.op + ")"
        ctx.fill()
    }
}

function init() {
    for (let i = 0; i < 5; i++) {
        let x = radius * Math.cos(-Math.PI / 10 * i)
        let y = radius * Math.sin(-Math.PI / 10 * i)
        for (let j = 0; j < Math.PI * 2; j += Math.PI / 18) {
            particles.push(new particle(j, canvas.width / 2, canvas.height / 2 + y, Math.abs(x)))
            if (i != 0) {
                particles.push(new particle(j, canvas.width / 2, canvas.height / 2 - y, Math.abs(x)))
            }

        }
    }
}
init()

function ani() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(255,255,255,0.3)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
    }
}
setInterval(() => {
    ani()
}, 1000 / 60);