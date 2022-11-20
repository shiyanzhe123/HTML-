var canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 800
var ctx = canvas.getContext("2d")
var deg = 0
var marks = []
class mark {
    constructor() {
        this.r = Math.random() * 100 + 250
        this.d = Math.random() * 360
        this.size = Math.random() * 2 + 3
        this.color = "white"
    }
    update() {
        this.r -= 0.1
    }
    draw() {
        if (Math.abs(this.d - deg) < 2) {
            var x = this.r * Math.sin(this.d * Math.PI / 180) + this.r * Math.cos(this.d * Math.PI / 180) + 400
            var y = this.r * Math.sin(this.d * Math.PI / 180) - this.r * Math.cos(this.d * Math.PI / 180) + 400
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.arc(x, y, this.size, 0, Math.PI * 2, 0)
            ctx.fill()
        }
    }
}
for (var i = 0; i < 20; i++) {
    marks.push(new mark())
}
function draw() {
    //绘制扫描线
    deg += 360 / 600
    deg = deg % 360
    ctx.beginPath()
    ctx.strokeStyle = "green"
    ctx.moveTo(400, 400)
    var x = 400 * Math.sin(deg * Math.PI / 180) + 400 * Math.cos(deg * Math.PI / 180) + 400
    var y = 400 * Math.sin(deg * Math.PI / 180) - 400 * Math.cos(deg * Math.PI / 180) + 400
    ctx.lineTo(x, y)
    ctx.lineWidth = 4
    ctx.stroke()
    ctx.closePath()
    //绘制坐标网格
    ctx.lineWidth = 1
    //绘制直线
    for (var i = 0; i < 360; i += 15) {
        ctx.beginPath()
        ctx.moveTo(400, 400)
        var x = 400 * Math.sin(i * Math.PI / 180) + 400 * Math.cos(i * Math.PI / 180) + 400
        var y = 400 * Math.sin(i * Math.PI / 180) - 400 * Math.cos(i * Math.PI / 180) + 400
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.closePath()
    }
    //绘制圆环
    for (var i = 0; i <= 400; i += 100) {
        ctx.beginPath()
        ctx.arc(400, 400, i, 0, Math.PI * 2, 0)
        ctx.stroke()
    }
    //绘制信号
    for (var i = 0; i < marks.length; i++) {
        marks[i].update()
        marks[i].draw()
        if (marks[i].r < 50) {
            marks.splice(i, 1)
            marks.push(new mark())
        }
    }
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(draw)
}
draw()