let canvas = document.getElementById("canvas")
width = 800
height = 800
r1 = 390
r2 = 330
r3 = 95
canvas.width = width
canvas.height = height
let ctx = canvas.getContext("2d")
let t = 0
let ra2 = document.getElementById("ra2")
let ra3 = document.getElementById("ra3")
let go = document.getElementById("draw")
let run = false
go.addEventListener("click", function() {
    run = true
})
ra3.addEventListener("input", function() {
    r3 = r2 * ra3.value * 0.01
    init()
})
ra2.addEventListener("input", function() {
    r2 = ra2.value
    r3 = r2 * ra3.value * 0.01
    init()
})

function init() {
    t = 0
    run = false
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, r1, 0, Math.PI * 2, 0)
    ctx.stroke()
    ctx.beginPath()
    let x = (r1 - r2) * Math.cos(t * Math.PI / 180) + width / 2
    let y = (r1 - r2) * Math.sin(t * Math.PI / 180) + height / 2
    ctx.arc(x, y, r2, 0, Math.PI * 2, 0)
    ctx.stroke()
    t0 = -t * Math.PI / 180 * r1 / r2
    let x1 = r3 + x
    let y1 = y
    ctx.beginPath()
    ctx.arc(x1, y1, 5, 0, Math.PI * 2, 0)
    ctx.fillStyle = "hsl(" + t0 * 180 / Math.PI + "deg,80%,50%)"
    ctx.fill()
}
init()

function draw() {
    if (t == 0.5) {
        ctx.clearRect(0, 0, width, height)
    }
    let x = (r1 - r2) * Math.cos(t * Math.PI / 180) + width / 2
    let y = (r1 - r2) * Math.sin(t * Math.PI / 180) + height / 2
    t0 = -t * Math.PI / 180 * r1 / r2
    let x1 = r3 * Math.cos(t0) + x
    let y1 = r3 * Math.sin(t0) + y
    ctx.beginPath()
    ctx.arc(x1, y1, 0.5, 0, Math.PI * 2, 0)
    ctx.fillStyle = "hsl(" + t0 * 180 / Math.PI + "deg,80%,50%)"
    ctx.fill()
    if (run) {
        t += 0.5
    }

}
setInterval(draw, 1)