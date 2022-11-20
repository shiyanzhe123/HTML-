let canvas = document.getElementById("canvas")
let size = 300
canvas.width = canvas.height = size
let ctx = canvas.getContext("2d")

let data = [80, 60, 70, 50, 40, 150, 120]

function cp(x, y, d, r) {
    let x1 = r * Math.cos(d * Math.PI / 180) + x
    let y1 = r * Math.sin(d * Math.PI / 180) + y
    return [x1, y1]
}
data.sort(function(a, b) { return b - a }) //按照从大到小的顺序重新排序
let sum = 0
for (i in data) {
    sum += data[i]
}

function drawSector(x, y, r, d1, d2) {
    let sp = cp(x, y, d1, r)
    let ep = cp(x, y, d2, r)
    ctx.beginPath()
    ctx.moveTo(sp[0], sp[1])
    ctx.lineTo(x, y)
    ctx.lineTo(ep[0], ep[1])
    ctx.arc(x, y, r, d1 * Math.PI / 180, d2 * Math.PI / 180, 0)
    ctx.fill()
}
// ctx.fillStyle = "white"
// drawSector(size / 2, size / 2, 100, 95, 135)

function draw() {
    let sd = 0
    ctx.clearRect(0, 0, size, size)
    for (i in data) {
        ed = data[i] / sum * 360 + sd
        ctx.fillStyle = "hsl(" + i / data.length * 360 + "deg,60%,50%)"
        drawSector(size / 2, size / 2, size / 2, sd, ed)
        sd = ed
    }
}
draw()