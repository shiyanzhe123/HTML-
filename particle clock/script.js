var clocks = document.getElementsByClassName("clock")
var ctx = []
var timestr = ""
var particleArray = []
var colors = ["#1e90ff", "#1e90ff", "#2ed573", "#2ed573", "#ffa502", "#ffa502"]
var fonts = []

function init() {
    for (var i = 0; i < clocks.length; i++) {
        clocks[i].width = 250
        clocks[i].height = 400
        ctx[i] = clocks[i].getContext("2d")
        ctx[i].fillStyle = colors[i]
        particleArray.push([])
    }
    for (var i = 0; i < 10; i++) {
        ctx[0].font = "40px Arial"
        var width = ctx[0].measureText(i).width | 0
        ctx[0].fillText(i, 0, 40)
        var data = ctx[0].getImageData(0, 0, width, 40).data
        var len = data.length
        var tdata = []
        for (var j = 0; j < len / 4; j++) {
            if (data[j * 4 + 3] != 0) {
                var x = j % width | 0
                var y = j / width | 0
                tdata.push([x, y])
            }
        }
        fonts.push(tdata)
        ctx[0].clearRect(0, 0, 40, 40)
    }
}

function timestring() {
    var d = new Date()
    return ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2)
}
init()
console.log(fonts)
class particle {
    constructor(x, y) {
        this.x = Math.random() * 25 - 2.5
        this.y = Math.random() * 40 + 5
        this.ex = x
        this.ey = y
    }
    update() {
        this.x -= (this.x - this.ex) / 10
        this.y -= (this.y - this.ey) / 10
    }
    draw(i) {
        ctx[i].fillStyle = colors[i]
        ctx[i].beginPath()
        ctx[i].arc(this.x * 10 + 25, this.y * 10 - 50, 2, 0, Math.PI * 180, 0)
        ctx[i].fill()
    }
}

function change(ind, pi) {
    var newcount = fonts[ind].length - particleArray[pi].length
    if (newcount >= 0) {
        for (var i = 0; i < newcount; i++) {
            particleArray[pi].push(new particle(10, 20))
        }
    }
    if (newcount < 0) {
        particleArray[pi].splice(0, -newcount)
    }
    for (var i = 0; i < fonts[ind].length; i++) {
        particleArray[pi][i].ex = fonts[ind][i][0]
        particleArray[pi][i].ey = fonts[ind][i][1]
    }
    particleArray[pi].sort(function(a, b) { return Math.random() - 0.5 })
}

function draw() {
    var timer = timestring()
    for (var i = 0; i < timer.length; i++) {
        if (timer.charAt(i) != timestr.charAt(i)) {
            change(timer.charAt(i), i)

        }
    }
    timestr = timer
    for (var i = 0; i < clocks.length; i++) {
        ctx[i].fillStyle = "rgba(0,0,0,0.1)"
        ctx[i].fillRect(0, 0, 250, 400)
        for (var j = 0; j < particleArray[i].length; j++) {
            p = particleArray[i][j]
            p.update()
            p.draw(i)
        }
    }
}
setInterval(draw, 20)