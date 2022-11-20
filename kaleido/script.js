let canvas = document.getElementById("canvas")
let size = 800
canvas.width = canvas.height = size
let ctx = canvas.getContext("2d")
let mouse = {
    x: 0,
    y: 0
}
let color = 0
let pendown = false
canvas.addEventListener("mousedown", function () {
    pendown = true
})
canvas.addEventListener("mouseup", function () {
    pendown = false
})
canvas.addEventListener("mousemove", function (evt) {
    mouse.x = evt.offsetX
    mouse.y = evt.offsetY
})
document.addEventListener("keyup", function (evt) {
    if (evt.key == " ") {
        ctx.clearRect(0, 0, size, size)
    }
})
function draw() {
    if (pendown) {
        let deg = Math.atan2(mouse.y - size / 2, mouse.x - size / 2)
        let radius = Math.sqrt(Math.pow(mouse.y - size / 2, 2) + Math.pow(mouse.x - size / 2, 2))
        for (var i = 0; i < 6; i++) {
            let x = radius * Math.cos(deg + i * Math.PI / 3) + size / 2
            let y = radius * Math.sin(deg + i * Math.PI / 3) + size / 2
            ctx.beginPath()
            ctx.arc(x, y, 11, 0, Math.PI * 2, 0)
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.beginPath()
            ctx.arc(x, y, 10, 0, Math.PI * 2, 0)
            ctx.fillStyle = "hsl(" + color + "deg,50%,50%)"
            ctx.fill()
        }
    }
    color++
    color = color % 360
}
setInterval(draw, 1000 / 60)