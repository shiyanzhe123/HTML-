var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600
var data = []
ctx.font = "15px sans-serif"
ctx.textAlign = "right"
ctx.fillStyle = "gray"

function init() {
    ctx.beginPath()
    ctx.moveTo(100, 500)
    ctx.lineTo(100, 100)
    ctx.moveTo(100, 500)
    ctx.lineTo(700, 500)
    ctx.stroke()
    ctx.beginPath()
    for (var i = 0; i <= 10; i++) {
        ctx.moveTo(100, i * 40 + 100)
        ctx.lineTo(700, i * 40 + 100)
        ctx.fillText((10 - i) * 10, 90, i * 40 + 107)
    }
    for (var i = 0; i < 12; i++) {
        data.push(Math.random())
        ctx.moveTo(i * (600 / 11) + 100, 100)
        ctx.lineTo(i * (600 / 11) + 100, 500)
        ctx.fillStyle = "gray"
        ctx.fillText((i + 1) + "月", i * (600 / 11) + 115, 520)
        ctx.fillStyle = "#2ed573"
        ctx.fillText((1 - data[i]) * 100 | 0, i * (600 / 11) + 115, 90)

    }
    ctx.lineWidth = 0.3
    ctx.stroke()
}

function draw() {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "green"
    for (var i = 0; i < data.length; i++) {
        ctx.lineTo(i * (600 / 11) + 100, data[i] * 400 + 100)
    }
    ctx.fillStyle = "rgba(0,255,0,0.3)"
    ctx.stroke()
    for (var i = 0; i < data.length; i++) {
        ctx.beginPath()
        ctx.arc(i * (600 / 11) + 100, data[i] * 400 + 100, 3, 0, Math.PI * 2, 0)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.stroke()
    }
}
init()
draw()