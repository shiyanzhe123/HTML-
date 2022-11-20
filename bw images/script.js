var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600
var tcan = document.createElement("canvas")
tcan.width = 160
tcan.height = 120
var tctx = tcan.getContext("2d")

var imges = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
var particleArray = []
ctx.fillStyle = "#333"
var count = 0
var imgindex = 0
class particle {
    constructor() {
        this.size = 0
        this.es = 0
    }
    update() {
        this.size -= (this.size - this.es) / 10
    }
}
function init() {
    for (var i = 0; i < 160 * 120; i++) {
        particleArray.push(new particle())
    }
    changeimg(0)
}
init()
function changeimg(val) {
    var img = new Image()
    img.src = imges[val]
    img.addEventListener("load", function () {
        tctx.drawImage(img, 0, 0, 160, 120)
        var imgdata = tctx.getImageData(0, 0, 160, 120).data
        for (var i = 0; i < imgdata.length / 4; i++) {
            var red = imgdata[i * 4]
            var green = imgdata[i * 4 + 1]
            var blue = imgdata[i * 4 + 2]
            var gray = red * 0.299 + green * 0.587 + blue * 0.114
            var p = particleArray[i]
            p.es = 2.5 - gray / 255 * 2.5
        }
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (count > 60) {
        imgindex++
        changeimg(imgindex % imges.length)
        count = 0
    }
    count++
    for (var i = 0; i < particleArray.length; i++) {
        var p = particleArray[i]
        p.update()
        var x = i % 160
        var y = (i / 160) | 0
        ctx.beginPath()
        ctx.arc(x * 5 + 2.5, y * 5 + 2.5, p.size, 0, Math.PI * 2)
        ctx.fill()
    }
    count++
}
setInterval(draw, 10)