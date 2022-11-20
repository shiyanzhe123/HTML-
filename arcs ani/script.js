let canvas = document.getElementById("canvas")
let size = 800
canvas.width = canvas.height = size
let ctx = canvas.getContext("2d")
let deg = 0
function draw() {
    // ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, size, size)

    for (var i = 0; i < 8; i++) {
        let x1 = size / 4 * Math.cos(i / 4 * Math.PI + deg / 5) + size / 2
        let y1 = size / 4 * Math.sin(i / 4 * Math.PI + deg / 5) + size / 2
        ctx.beginPath()
        ctx.arc(x1, y1, size / 4, deg + i / 4 * Math.PI, Math.PI + deg + i / 4 * Math.PI, 0)
        ctx.strokeStyle = "hsl(" + deg * 50 + "deg,80%,50%)"
        ctx.lineWidth = 3
        ctx.stroke()

        let x2 = size / 4 * Math.cos(i / 4 * Math.PI + 0.5 - deg / 5) + size / 2
        let y2 = size / 4 * Math.sin(i / 4 * Math.PI + 0.5 - deg / 5) + size / 2
        ctx.beginPath()
        ctx.arc(x2, y2, size / 5, deg + i / 4 * Math.PI, Math.PI + deg + i / 4 * Math.PI, 0)
        ctx.strokeStyle = "hsl(" + deg * 100 + "deg,80%,50%)"
        ctx.lineWidth = 1
        ctx.stroke()
    }

    deg += 0.02
}
setInterval(draw, 1000 / 60)