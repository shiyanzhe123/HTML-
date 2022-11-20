var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particleArray = []
fillcolor = "white"
var timer = 0
var pic = 0
class particle {
    constructor() {
        this.x = Math.random() * canvas.width | 0
        this.y = Math.random() * canvas.height | 0
        this.ex = canvas.width / 2
        this.ey = canvas.height / 2
    }
    update() {
        this.x -= (this.x - this.ex) / 100
        this.y -= (this.y - this.ey) / 100
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 180, 0)
        ctx.fill()
        ctx.closePath()
    }
}

function init() {
    for (var i = 0; i < 400; i++) {
        particleArray.push(new particle())
    }
}
init()

function change(val) {
    var ep = []
    switch (val) {
        case 0: //正方形
            for (var i = 0; i < 400; i++) {
                var x = i % 20 * 40 + (canvas.width - 760) / 2
                var y = (i / 20 | 0) * 40 + (canvas.height - 760) / 2
                ep.push([x, y])
            }
            break
        case 1: // 环形
            for (var i = 0; i < 400; i++) {
                r = (i / 50 | 0) * 20 + 180
                var x = canvas.width / 2 + r * Math.cos((i * 360 / 50) * Math.PI / 180)
                var y = canvas.height / 2 + r * Math.sin((i * 360 / 50) * Math.PI / 180)
                ep.push([x, y])
            }
            break
        case 2: //X形
            for (var i = 0; i < 400; i++) {
                if (i % 2 == 0) {
                    var x = 450 - (i / 10 | 0) * 10 - (i % 10) * 10 + (canvas.width - 450) / 2
                } else {
                    var x = (i / 10 | 0) * 10 + (i % 10) * 10 + (canvas.width - 450) / 2
                }
                var y = (i / 10 | 0) * 10 + (canvas.height - 450) / 2
                ep.push([x, y])
            }
            break
        case 3: //螺旋
            for (var i = 0; i < 400; i++) {
                r = i % 360
                var x = canvas.width / 2 + i * Math.cos((i * 360 / 50) * Math.PI / 180)
                var y = canvas.height / 2 + i * Math.sin((i * 360 / 50) * Math.PI / 180)
                ep.push([x, y])
            }
            break
    }
    return ep
}


function draw() {
    if (timer < 0) { //8秒重置一次
        timer = 800
        pic++
        var ep = change(pic % 4)
        ep.sort(function(a, b) { return Math.random() - 0.5 })
        for (var i = 0; i < 400; i++) {
            particleArray[i].ex = ep[i][0]
            particleArray[i].ey = ep[i][1]
        }
        fillcolor = "hsl(" + (Math.random() * 360 | 0) + ",80%,50%)" //随机生成颜色
    }
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = fillcolor
    timer--
    for (var i = 0; i < particleArray.length; i++) {
        var p = particleArray[i]
        p.update()
        p.draw()
    }
}
setInterval(draw, 10)