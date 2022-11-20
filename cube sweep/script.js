let canvas = document.getElementById("canvas")
let width = 400
let height = 400
canvas.width = width
canvas.height = height
let ctx = canvas.getContext("2d")
ctx.lineWidth = 1
ctx.stroke()
let count = 0

function draw() {
    ctx.fillStyle = "rgba(255,255,255,0.01)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    switch (count / 40 | 0) {
        case 0:
            ctx.moveTo((count % 40) / 40 * width, 0)
            ctx.lineTo(width, (count % 40) / 40 * height)
            break
        case 1:
            ctx.moveTo(width, (count % 40) / 40 * height)
            ctx.lineTo(width - (count % 40) / 40 * width, height)
            break
        case 2:
            ctx.moveTo(width - (count % 40) / 40 * width, height)
            ctx.lineTo(0, height - (count % 40) / 40 * height)
            break
        case 3:
            ctx.moveTo(0, height - (count % 40) / 40 * height)
            ctx.lineTo((count % 40) / 40 * width, 0)
            break
        default:
            count = 0
    }
    ctx.strokeStyle = "hsl(" + count / 160 * 360 + "deg,50%,50%)"
    ctx.stroke()

    count++

}
setInterval(draw, 30)