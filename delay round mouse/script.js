var particleArray = []
var mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
document.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x
    mouse.y = evt.y
        // console.log(evt.x)
})
class particle {
    constructor() {
        this.r = Math.random() + 0.5
        this.color = "hsl(" + (Math.random() * 360 | 0) + ",80%,50%)"
        this.d = Math.random() * 360 | 0
        this.size = Math.random() * 3 | 0 + 1
        this.x = 0
        this.y = 0
        this.speed = Math.random()
        this.dx = 0
        this.dy = 0
        this.deg = 0
    }
    update() {
        this.dx = (mouse.x - this.x) / 100
        this.dy = (mouse.y - this.y) / 100
        this.d += this.speed
        this.deg = 360 * Math.atan(this.dy / this.dx) / (2 * Math.PI)
        this.x += this.dx
        this.y += this.dy
        this.x = this.x + this.r * Math.cos((this.d % 360) * Math.PI / 180)
        this.y = this.y + this.r * Math.sin((this.d % 360) * Math.PI / 180)
    }
}

function init() {
    for (var i = 0; i < 20; i++) {
        particleArray.push(new particle)
        var span = document.createElement("span")
        span.className = "particle"
        var p = particleArray[i]
        span.style.width = p.size + "px"
        span.style.height = p.size + "px"

        span.style.background = p.color
        span.style.boxShadow = "0 0 1px " + p.color + ",0 0 2px " + p.color
        document.body.appendChild(span)
    }
}
init()
var spans = document.getElementsByClassName("particle")

function draw() {
    for (var i = 0; i < particleArray.length; i++) {
        p = particleArray[i]
        p.update()
        sp = spans[i]
        sp.style.top = p.y + "px"
        sp.style.left = p.x + "px"
        sp.style.width = p.size + (Math.abs(p.dx) + Math.abs(p.dy)) + "px"
        sp.style.transform = "rotate(" + p.deg + "deg)"
            // console.log(p.size)
    }
}
draw()
setInterval(draw, 1)