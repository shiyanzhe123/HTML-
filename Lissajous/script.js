let canvas = document.getElementById("canvas")
canvas.width = 600
canvas.height = 600
let ctx = canvas.getContext("2d")
let rx = document.getElementById("rx")
let ry = document.getElementById("ry")
let cx = document.querySelector(".cx")
let cy = document.querySelector(".cy")
let xt = 1
let yt = 1
rx.addEventListener("input", function () {
    xt = rx.value
})
ry.addEventListener("input", function () {
    yt = ry.value
})

function init(d) {
    let pl = []
    for (var t = 0; t < Math.PI * 2; t += 0.01) {
        let x = Math.sin(xt * t + Math.PI / 2) * 300
        let y = Math.sin(yt * t + d) * 300
        pl.push([x, y])
    }
    return pl
}
let deg = 0

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let points = init(deg * Math.PI / 100)
    ctx.beginPath()
    for (var i in points) {
        let p = points[i]
        ctx.lineTo(p[0] + 300, p[1] + 300)
    }
    cx.innerText = "x = sin(" + xt + " * t + π / 2)"
    cy.innerText = "y = sin(" + yt + " * t + π * " + deg % 200 / 100 + ")"
    ctx.strokeStyle = "hsl(" + deg % 200 / 200 * 360 + "deg,80%,50%)"
    ctx.closePath()
    ctx.stroke()
    deg++
}
setInterval(draw, 20);