var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var strs = ["HELLO", "WORLD", "你好", "欢迎来到", "我的世界！"]
var textcanvas = document.createElement("canvas")
var tctx = textcanvas.getContext("2d")
var pixs = []
var index = 0
var colors = ["#ffa502", "#ff6348", "#ff4757", "#2ed573", "#1e90ff", "#3742fa"]

function textdata(i) {

    var textsize = check(strs[i])
    textcanvas.width = textsize[0]
    textcanvas.height = textsize[1]
    tctx.clearRect(0, 0, textcanvas.width, textcanvas.height)
    tctx.font = "40px Arial"
    tctx.fillStyle = "white"
    tctx.fillText(strs[i], 0, 40)
    return tctx.getImageData(0, 0, textcanvas.width, textcanvas.height)

}

var particalsArray = []
class Partical {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vy = Math.random() - 1.5
        this.vx = 0.5 - Math.random()
        this.g = 0.01
        this.color = colors[Math.random() * colors.length | 0]
        this.wait = 80
    }
    update() {
        if (this.wait < 0) {
            this.x += this.vx * 2
            this.y += this.vy * 2
            this.vy += this.g
        }
        this.wait--
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

function init() {
    pixs = textdata(index % strs.length)
    for (var i = 0; i < pixs.data.length / 4; i++) {
        if (pixs.data[i * 4 + 3] != 0) {
            x = (i % textcanvas.width) * 5 + (canvas.width - textcanvas.width * 5) / 2
            y = (i / textcanvas.width | 0) * 5 + (canvas.height - textcanvas.height * 5) / 2
            particalsArray.push(new Partical(x, y))
        }
    }
    index++
}


function check(str) {
    var span = document.createElement("span")
    span.className = "check"
    span.textContent = str
    document.body.appendChild(span)
    var w = span.clientWidth
    var h = span.clientHeight
    document.body.removeChild(span)
    return [w, h]
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < particalsArray.length; i++) {
        var partical = particalsArray[i]
        partical.update()
        partical.draw()
        if (partical.y > canvas.height) {
            particalsArray.splice(i, 1)
        }
        if (particalsArray.length == 0) {
            init()
        }
    }
}
init()
setInterval(draw, 10);