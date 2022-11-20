let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
ctx.fillStyle = "#333"
ctx.strokeStyle = "#333"
let deg = 0
let count = document.querySelector("#count")
let counttext = 10
let particles = []
class particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.age = Math.random() * 40 | 0
    }
    update() {
        this.age--
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, 0)
        ctx.fillStyle = "white"
        ctx.fill()
    }
}

function sector(x, y, d, r) {
    ctx.fillStyle = "#333"
    ctx.beginPath()
    if (d <= 180) {
        ctx.arc(x, y, r, -90 * Math.PI / 180, (d - 90) * Math.PI / 180, 0)
    } else {
        r = -r
        ctx.arc(x, y, Math.abs(r), 90 * Math.PI / 180, (d - 90) * Math.PI / 180, 0)
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y - r)
    x1 = Math.abs(r) * Math.cos((d - 90) * Math.PI / 180) + x
    y1 = Math.abs(r) * Math.sin((d - 90) * Math.PI / 180) + y
        // if(d>180){
    for (let i = 0; i < 20; i++) {
        let p = linedot(canvas.width / 2, canvas.height / 2, x1, y1)
        particles.push(new particle(p[0], p[1]))
    }
    // }
    ctx.lineTo(x1, y1)
    ctx.closePath()
    ctx.fill()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText("10", canvas.width / 2, canvas.height / 2)
    deg++
    deg = deg % 360
    if (deg == 0) {
        counttext--
        if (counttext == 0) {
            counttext = 10
        }
    }
    count.innerHTML = counttext
    if (deg > 180) {
        sector(canvas.width / 2, canvas.height / 2, 180, 500)
    }
    sector(canvas.width / 2, canvas.height / 2, deg, 500)
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (p.age < 0) {
            particles.splice(i, 1)
        }
    }

}

function linedot(x1, y1, x2, y2) {
    let x = Math.random() * (x2 - x1) + x1
    let y = (x - x1) * (y2 - y1) / (x2 - x1) + y1
        // console.log([x, y])
    return [x, y]
}
setInterval(draw, 1000 / 60)