let canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.background = "rgba(0,0,0,0.1)"
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.zIndex = "999"
canvas.style.pointerEvents = "none"
let ctx = canvas.getContext("2d")

let backcolor = "rgba(30,144,255,0.8)"
ctx.fillStyle = backcolor
ctx.strokeStyle = backcolor

document.styleSheets[0].insertRule('* {cursor:none;}', 0)

let mouse = {
    x: -100,
    y: -100
}
let particles = []
class particle {
    constructor(x, y, mouseclick) {
        this.x = x
        this.y = y
        if (!mouseclick) {
            this.vx = Math.random() - 0.5
            this.vy = Math.random()
            this.age = Math.random() * 30
            this.color = backcolor
        }
        else {
            let deg = Math.random() * Math.PI * 2
            let r = Math.random()
            this.vx = r * Math.cos(deg)
            this.vy = r * Math.sin(deg)
            this.age = Math.random() * 30 + 30
            this.color = "white"
        }

    }
    update() {
        this.age--
        this.x += this.vx
        this.y += this.vy
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

document.body.addEventListener("mousemove", function (evt) {
    mouse.x = evt.x
    mouse.y = evt.y
    for (let i = 0; i < 10; i++) {
        particles.push(new particle(mouse.x, mouse.y, false))
    }
})
document.body.addEventListener("click", function () {
    for (let i = 0; i < 100; i++) {
        particles.push(new particle(mouse.x, mouse.y, true))
    }
})
function ani() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stick()
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (p.age < 0) {
            particles.splice(i, 1)
        }
    }
}
setInterval(ani, 100 / 6)

function stick() {
    ctx.beginPath()
    ctx.moveTo(mouse.x, mouse.y)
    ctx.lineTo(mouse.x + 30, mouse.y + 30)
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = backcolor
}