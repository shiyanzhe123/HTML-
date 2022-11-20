let canvas = document.createElement("canvas")

let width = window.innerWidth
canvas.width = width
canvas.height = 100
canvas.style.pointerEvents = "none"
let ctx = canvas.getContext("2d")
document.body.appendChild(canvas)
let points = []
function init() {
    ctx.beginPath()
    for (var i = 0; i < width + 50; i += (width / 30) | 0) {
        y = 50 * Math.sin(i / width * Math.PI * 4) + 50
        ctx.lineTo(i, y)
        let span = document.createElement("span")
        span.className = "light"
        span.style.top = y + 10 + "px"
        span.style.left = i + "px"
        span.style.setProperty("--c", "hsl(" + Math.random() * 360 + "deg,80%,50%)")
        span.style.animationDelay = Math.random() * 4 + "s"
        document.body.appendChild(span)
    }
    ctx.stroke()
}
init()
