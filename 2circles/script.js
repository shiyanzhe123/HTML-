let canvas = document.getElementById("canvas")
canvas.width = 600
canvas.height = 600
let ctx = canvas.getContext("2d")
let R1 = 40
let R2 = 120
let deg = 0
let count = 0
let C1 = 100
let C2 = 0

function draw() {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, Math.PI * 2, 0)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.fillStyle = "#333"
    if (deg <= 80) {
        R2 -= 2
        R1 += 2
        C1 -= 4
        C2 += 4
    }
    if (deg % (720 + 180) == 0) {
        R1 = 40
        R2 = 120
        C1 = 160
        C2 = 0
        deg = 0
    }
    deg += 2
    let x1 = C1 * Math.cos(deg * Math.PI / 180) + 300
    let y1 = C1 * Math.sin(deg * Math.PI / 180) + 300
    ctx.beginPath()
    ctx.arc(x1, y1, R1, 0, Math.PI * 2)
    ctx.fill()

    let x2 = C2 * Math.cos((deg - 180) * Math.PI / 180) + 300
    let y2 = C2 * Math.sin((deg - 180) * Math.PI / 180) + 300
    ctx.beginPath()
    ctx.arc(x2, y2, R2, 0, Math.PI * 2, 0)
    ctx.fill()
}

setInterval(draw, 1000 / 60)