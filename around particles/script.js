let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let particles = []
let numbers = []
let count = 0
let ind = 10
class particle {
    constructor(d, r) {
        this.deg = Math.random() * Math.PI * 2
        this.r = 0
        this.vd = d
        this.vr = r
    }
    update() {
        this.deg += (this.vd - this.deg) / 30
        this.r += (this.vr - this.r) / 30
    }
    draw() {
        let x = this.r * Math.cos(this.deg) + canvas.width / 2
        let y = this.r * Math.sin(this.deg) + canvas.height / 2
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
    }
}

function init() {
    for (let i = 0; i <= 10; i++) {
        ctx.font = "40px Arial"
        let span = document.createElement("span")
        span.style.fontSize = "40px"
        span.style.fontFamily = "Arial"
        span.innerHTML = i
        document.body.appendChild(span)
        let width = span.offsetWidth
        let height = span.offsetHeight
        span.remove()
        ctx.fillText(i, 0, height)
        let data = ctx.getImageData(0, 0, width, height).data
        let len = data.length
        let tdata = []
        for (let j = 0; j < len / 4; j++) {
            if (data[j * 4 + 3] != 0) {
                let x = (j % width | 0) * 20 + (canvas.width - width * 20) / 2
                let y = (j / width | 0) * 20 + (canvas.height - height * 25) / 2
                let deg = Math.atan2(
                    (canvas.height / 2 - y),
                    (canvas.width / 2 - x)
                ) + Math.PI
                let r = Math.sqrt(
                    Math.pow(canvas.width / 2 - x, 2) +
                    Math.pow(canvas.height / 2 - y, 2)
                )
                tdata.push([deg, r])
            }
        }
        numbers.push(tdata)
        ctx.clearRect(0, 0, width, height)
    }
}
init()
function change(val) {
    for (let i in numbers[val]) {
        let p = numbers[val][i]
        particles.push(new particle(p[0], p[1]))
    }
}
function ani() {
    if (count == 0) {
        particles = []
        change(ind)
    }
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
    }
    count++
    if (ind == 0) {
        ind = 11
    }
    if (count == 240) {
        ind--
        count = 0
    }
}
setInterval(ani, 1000 / 60)