var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var img = new Image()
img.src = "blossom.jpg"
var particleArray = []
img.addEventListener("load", function () {
    var ic = document.createElement("canvas")
    var ictx = ic.getContext("2d")
    ic.width = img.width
    ic.height = img.height
    ictx.drawImage(img, 0, 0, img.width, img.height)
    var imgdata = ictx.getImageData(0, 0, img.width, img.height)
    // ctx.drawImage(
    //     ic,
    //     (canvas.width - ic.width) / 2,
    //     (canvas.height - ic.height) / 2,
    //     ic.width,
    //     ic.height
    // )
    // document.body.appendChild(ic)
    ic.style.zIndex = "-1"
    var imgArray = []
    for (var i = 0; i < imgdata.data.length / 4; i++) {
        imgArray.push(i)
    }
    function newparticle() {
        for (var c = 0; c < 100; c++) {
            var ind = (Math.random() * imgArray.length) | 0
            var ci = imgArray[ind]
            var cx = ci % img.width
            var cy = (ci / img.width) | 0
            var r = imgdata.data[ci * 4]
            var g = imgdata.data[ci * 4 + 1]
            var b = imgdata.data[ci * 4 + 2]
            var color = "rgb(" + r + "," + g + "," + b + ")"
            particleArray.push(new Particle(
                cx + (canvas.width - img.width) / 2,
                cy + (canvas.height - img.height) / 2,
                color
            ))
            ictx.clearRect(cx, cy, 1, 1)
            imgArray.splice(ind, 1)
            for (var i = 0; i < 10; i++) {
                var ind = (Math.random() * imgArray.length) | 0
                var ci = imgArray[ind]
                var cx = ci % img.width
                var cy = (ci / img.width) | 0
                ictx.clearRect(cx, cy, 1, 1)
                imgArray.splice(ind, 1)
            }
        }
    }
    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            ic,
            (canvas.width - ic.width) / 2,
            (canvas.height - ic.height) / 2,
            ic.width,
            ic.height
        )
        newparticle()
        for (var i = 0; i < particleArray.length; i++) {
            var particle = particleArray[i]
            particle.update()
            particle.draw()
            if (particle.age > 50) {
                particleArray.splice(i, 1)
            }
        }
        requestAnimationFrame(draw)
    }
    draw()
})
class Particle {
    constructor(x, y, c) {
        this.x = x
        this.y = y
        this.color = c
        this.vy = -Math.random()
        this.vx = Math.random()
        this.age = 0
    }
    update() {
        this.y += this.vy
        this.x += this.vx
        this.vy *= 1.05
        this.vx *= 1.05
        this.age++
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.vx / 3, 0, Math.PI * 2, 0)
        ctx.fill()
    }
}