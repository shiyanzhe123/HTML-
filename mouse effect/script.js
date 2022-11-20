let canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.background = "rgba(0,0,0,0.1)"
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.zIndex = "999"
canvas.style.pointerEvents = "none"
let ctx = canvas.getContext("2d")

let count = 0
let backcolor = "rgba(30,144,255,0.8)"
ctx.fillStyle = backcolor
ctx.strokeStyle = backcolor

document.styleSheets[0].insertRule('* {cursor:none', 0)

let mouse = {
    x: -100,
    y: -100
}
document.body.addEventListener("mousemove", function (evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
function ani() {
    count++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cross()
    // circle()
    star()
    ring()
}
setInterval(ani, 100 / 6)

function cross() {
    ctx.beginPath()
    ctx.moveTo(mouse.x - 30, mouse.y)
    ctx.lineTo(mouse.x + 30, mouse.y)
    ctx.moveTo(mouse.x, mouse.y - 30)
    ctx.lineTo(mouse.x, mouse.y + 30)
    ctx.stroke()
}
function circle() {
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2)
    ctx.stroke()
}
function star() {
    ctx.beginPath()
    for (i = 0; i < 10; i += 2) {
        let x = 20 * Math.cos(i / 5 * Math.PI * 2 + count * Math.PI / 100) + mouse.x
        let y = 20 * Math.sin(i / 5 * Math.PI * 2 + count * Math.PI / 100) + mouse.y
        ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
}
function ring() {
    for (i = 0; i < 10; i++) {
        ctx.beginPath()
        let x = 20 * Math.cos(i / 10 * Math.PI * 2 + count * Math.PI / 30) + mouse.x
        let y = 20 * Math.sin(i / 10 * Math.PI * 2 + count * Math.PI / 30) + mouse.y
        ctx.arc(x, y, i / 3, 0, Math.PI * 2)
        ctx.fill()
    }
}