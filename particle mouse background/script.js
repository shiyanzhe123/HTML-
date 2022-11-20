var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var particlesArray = []
var count = parseInt(canvas.height / 100 * canvas.width / 100)
var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}
ctx.lineWidth = 1
ctx.fillStyle = "#333"
class Particle {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.directionX = 0.5 - Math.random()
        this.directionY = 0.5 - Math.random()
    }
    update() {
        this.y += this.directionY
        this.x += this.directionX
        this.size -= 0.2
    }
    draw() {
        ctx.strokeStyle = "#2ed573"
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
    }
}
function createParticle() {
    var x = (0.5 - Math.random()) * 400 + mouse.x
    var y = (0.5 - Math.random()) * 400 + mouse.y
    var size = Math.random() * 50 + 10
    particlesArray.push(new Particle(x, y, size))
}
function handleParticle() {
    for (var i = 0; i < particlesArray.length; i++) {
        var particle = particlesArray[i]
        if (particle.size < 1) {
            particlesArray.splice(i, 1)
        }
        for (var j = i; j < particlesArray.length; j++) {
            dx = particlesArray[i].x - particlesArray[j].x
            dy = particlesArray[i].y - particlesArray[j].y
            long = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
            if (long < 100) {
                ctx.beginPath()
                ctx.strokeStyle = "rgba(46, 213, 115," + (1 - long / 100) + ")"
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
            }
        }
        particle.update()
        particle.draw()
    }

}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (particlesArray.length < count) {
        createParticle()
    }
    handleParticle()
}
window.addEventListener("mousemove", function (evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
setInterval(() => { draw(), 1 })