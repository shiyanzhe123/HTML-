let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let particles = []
let numbers = []
let count = 60
let ind = 0

function init() {
    for (var i = 0; i <= 10; i++) {
        ctx.font = "40px Arial"
        let width = ctx.measureText(i).width | 0
        ctx.fillText(i, 0, 40)
        let data = ctx.getImageData(0, 0, width, 41).data
        let len = data.length
        let tdata = []
        for (var j = 0; j < len / 4; j++) {
            if (data[j * 4 + 3] != 0) {
                var x = j % width | 0
                var y = j / width | 0
                tdata.push([x * 20 + (canvas.width - width * 20) / 2, y * 20 + (canvas.height - 40 * 20) / 2 - 200])
            }
        }
        numbers.push(tdata)
        ctx.clearRect(0, 0, 40, 41)
    }
}
init()
class particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 4
        this.vy = Math.random() * 3 + 5
        this.g = this.vy
        this.ty = 0.1
        this.opt = 0
        this.fall = false
        this.color = "hsla(" + ind * 30 + ",80%,50%,"
    }
    update() {
        if (this.fall) {
            if (this.y >= canvas.height) {
                this.g *= Math.random() * 0.8
                this.vy = -this.g
            }
            this.x += this.vx
            this.y += this.vy
            this.vy += this.ty
        }
        this.opt += 0.01
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, 0)
        ctx.fillStyle = this.color + this.opt + ")"
        ctx.fill()
    }
}

function change(i) {
    for (let j in numbers[i]) {
        let p = numbers[i][j]
        particles.push(new particle(p[0], p[1]))
    }
}

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    count++
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (Math.abs(p.g) < 2) {
            particles.splice(i, 1)
        }
        if (count == 60) {
            p.fall = true

        }
    }
    if (count == 120) {
        change(10 - ind)
        count = 0
        ind++
        ind = ind % numbers.length

    }
}
setInterval(draw, 1000 / 60);