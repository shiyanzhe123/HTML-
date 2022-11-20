var canvas = document.getElementById("canvas")
canvas.width = 400
canvas.height = 400
var ctx = canvas.getContext("2d")
var clock = document.getElementById("clock")
var colors = ["#1e90ff", "#2ed573", "#ff6348"]
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var d = new Date()
    var secdeg = d.getSeconds() * 6 + d.getMilliseconds() * 6 / 1000
    var mindeg = d.getMinutes() * 6 + secdeg / 60
    var hourdeg = d.getHours() % 12 * 30 + mindeg / 60
    var lines = [hourdeg, mindeg, secdeg]
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.beginPath()

    for (var i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(200, 200, 140 + i * 20, 0, Math.PI * 2)
        ctx.strokeStyle = "#222"
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(200, 200, 140 + i * 20, -Math.PI / 2, Math.PI / 180 * lines[i] - Math.PI / 2, 0)
        ctx.strokeStyle = colors[i]
        ctx.stroke()
    }
    for (var i = 0; i < 12; i++) {
        var bx = 200 + 180 * Math.cos(i * 30 * Math.PI / 180)
        var by = 200 + 180 * Math.sin(i * 30 * Math.PI / 180)
        ctx.fillStyle = "#6FD08C"
        ctx.beginPath()
        ctx.arc(bx, by, 3, 0, Math.PI * 2)
        ctx.fill()
    }
    var x = 10 * Math.cos((secdeg + 90) * Math.PI / 180)
    var y = 10 * Math.sin((secdeg + 90) * Math.PI / 180)
    clock.style.textShadow = x + "px " + y + "px 5px hsl(" + (mindeg | 0) + ",30%,30%)"
    clock.style.color = "hsl(" + (mindeg | 0) + ",80%,50%)"
    clock.innerText = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2)
    requestAnimationFrame(draw)
}
draw()