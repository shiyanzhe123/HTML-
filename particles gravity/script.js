let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let particles = []
let mouse = {
    x: -500,
    y: -500
}
document.addEventListener("mousemove", function (evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
class particle {
    constructor() {
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.init()
    }
    init() {
        this.x = Math.random() * canvas.width|0
        this.y = Math.random() * canvas.height|0
        this.vx = Math.random() - 0.5
        this.vy = Math.random() - 0.5
        this.age = Math.random() * 50 | 0
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.init()
        }
        this.age--
        if (this.age < 0) {
            this.age = Math.random() * 50 | 0
            this.vx += (Math.random() - 0.5) * 0.1
            this.vy += (Math.random() - 0.5) * 0.1
        }
        let r = Math.sqrt(Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2))
        if (r < 200) {
            this.x -= (this.x - mouse.x) / 500
            this.y -= (this.y - mouse.y) / 500
        }
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx.fill()
    }
}
function init() {
    for (let i = 0; i < 200; i++) {
        particles.push(new particle())
    }
}
init()
function ani() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        // for (let j in particles.slice(i, particles.length)) {
            for(let j=i;j<particles.length;j++){
            let p2 = particles[j]
            let r = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2))
            if (r < 50) {
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.strokeStyle = "rgba(0,0,0," + (1 - r / 50) + ")"
                ctx.stroke()
            }
        }
    }
}
setInterval(ani, 1000 / 60)