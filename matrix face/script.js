var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particlesArray = []
var fontsize = canvas.height / 80 | 0
var str = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをん"
ctx.font = fontsize + "px Arial"

var count = canvas.width / fontsize * 20 | 0
var img = new Image()
img.src = "face.png"
img.addEventListener("load", function() {
    var ih = 80
    var iw = 80 * img.width / img.height | 0
    ctx.drawImage(img, 0, 0, iw, ih)
    var imgdata = ctx.getImageData(0, 0, iw, ih)
    var move = (canvas.width / fontsize - iw) / 2 | 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    function check(x, y) {
        var ind = y * iw + x
        if (x > 0 && x < iw && y < ih) {
            var r = imgdata.data[ind * 4]
            var g = imgdata.data[ind * 4 + 1]
            var b = imgdata.data[ind * 4 + 2]
            var a = imgdata.data[ind * 4 + 3]
            var color = (r * 0.299 + g * 0.587 + b * 0.114) / 255 * 1.5
            if (a == 0) {
                color = 0.2
            }
            return "rgba(0,255,0," + color + ")"
        }
        return "green"
    }
    class Particle {
        constructor() {
            this.x = (Math.random() * (canvas.width / fontsize) | 0) * fontsize
            this.y = Math.random() * canvas.height | 0
            this.size = fontsize
        }
        update() {
            this.y += this.size
        }
        draw() {
            ctx.fillStyle = check(this.x / fontsize - move, this.y / fontsize)
            ctx.fillText(str[Math.random() * str.length | 0], this.x, this.y)
        }
    }

    function init() {
        for (var i = 0; i < count; i++) {
            particlesArray.push(new Particle())
        }
    }
    init()

    function draw() {

        ctx.fillStyle = "rgba(0,0,0,0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (var i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update()
            particlesArray[i].draw()
            if (particlesArray[i].y > canvas.height) {
                particlesArray[i].y = 0
                particlesArray[i].x = (Math.random() * (canvas.width / fontsize) | 0) * fontsize
            }
        }
    }
    setInterval(draw, 100)
})