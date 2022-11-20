let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let hexs = []
let count = 500
class hex {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.deg = 0
        this.color = "hsla(" + (Math.random() * 360 | 0) + ",80%,50%,0.5)"
        this.tx = x
        this.ty = y
        this.td = 0
    }
    update() {
        this.x += (this.tx - this.x) / 100
        this.y += (this.ty - this.y) / 100
        this.deg += (this.td - this.deg) / 100
    }
    draw() {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
            let x = 40 * Math.cos(i * Math.PI / 3 + this.deg) + this.x
            let y = 40 * Math.sin(i * Math.PI / 3 + this.deg) + this.y
            ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.stroke()
    }
}
function init() {
    for (let w = 0; w < canvas.width / 120 + 1; w++) {
        for (let h = 0; h < canvas.height / Math.sqrt(1200) + 1; h++) {
            hexs.push(new hex(w * 120 + (h % 2) * 60, h * Math.sqrt(1200)))
        }
    }
}
init()
function resort() {
    hexs.sort(function () { return Math.random() - 0.5 })
    let i = 0
    for (let w = 0; w < canvas.width / 120 + 1; w++) {
        for (let h = 0; h < canvas.height / Math.sqrt(1200) + 1; h++) {
            hexs[i].tx = w * 120 + (h % 2) * 60
            hexs[i].ty = h * Math.sqrt(1200)
            hexs[i].td = (Math.random() * 6 | 0) * Math.PI
            i++
        }
    }
}
function ani() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    count = count % 1000
    for (let i in hexs) {
        let h = hexs[i]
        h.update()
        h.draw()
        if (count == 0) {
            resort()
        }
    }
    count++
}
setInterval(ani, 100 / 6)