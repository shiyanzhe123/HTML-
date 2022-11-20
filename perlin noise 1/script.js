var canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 600
var ctx = canvas.getContext("2d")
var cal = 300
var points = []
var sx = 0
function init() {
    points=[]
    for (var i = 0; i < (canvas.width / cal | 0) + 2; i++) {
        points.push(Math.random()) // [0,1]
    }
}

function drawpoints() {
    for (var i = 0; i < points.length; i++) {
        ctx.fillStyle = "red"
        ctx.fillRect(i * cal, points[i] * canvas.height, 5, 5)
    }
}
init()
// drawpoints()
function check(x) {
    var p0 = (x / cal) | 0
    var p1 = p0 + 1
    var vx1 = (x - p0 * cal) / cal * points[p0]
    var vx2 = (x - p1 * cal) / cal * points[p1]
    var tx = (x - p0 * cal) / cal
    var tx = 6 * Math.pow(tx, 5) - 15 * Math.pow(tx, 4) + 10 * Math.pow(tx, 3)
    var y = (1 - tx) * vx1 + tx * vx2
    return (y)
}

function test(x) {
    ctx.fillStyle = "blue"
    ctx.fillRect(x, check(x) * canvas.height + 300, 1, 1)
}

function drawline() {
    if (sx == 0) {
        ctx.beginPath()
        ctx.moveTo(sx, check(sx) * canvas.height + 300)
        ctx.strokeStyle = "hsl(" + ((Math.random() * 360) | 0) + "deg,50%,50%)"
    }
    var y = check(sx) * canvas.height + 300
    ctx.lineWidth = 0.1
    ctx.lineTo(sx, y)
    ctx.stroke()
    sx++
    if (sx > canvas.width) {
        sx = 0
        init()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}
setInterval(drawline, 1)