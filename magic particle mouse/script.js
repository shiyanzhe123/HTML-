var canvas = document.createElement("canvas")
canvas.style.position = "fixed"
canvas.style.pointerEvents = "none"
canvas.style.left = 0
canvas.style.top = 0
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)
var ctx = canvas.getContext("2d")
var particlesArray = []
class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = Math.random() * 255 | 0
        this.vx = 0.5 - Math.random()
        this.vy = 0.5 - Math.random()
        this.age = Math.random() * 100

    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.01
        this.age--
            this.color++
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = "hsl(" + this.color % 255 + "deg,50%,50%)"
        ctx.arc(this.x, this.y, this.color % 3, Math.PI * 2, false)
        ctx.fill()
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < particlesArray.length; i++) {
        var pix = particlesArray[i]
        pix.update()
        pix.draw()
        if (pix.age < 0) {
            particlesArray.splice(i, 1)
        }
    }
    // ctx.fillText(particlesArray.length, 10, 10)

}
window.addEventListener("mousemove", function(evt) {
    for (var i = 0; i < 10; i++) {
        particlesArray.push(new Particle(evt.x, evt.y))
    }

})
window.addEventListener("click", function(evt) {
    for (var i = 0; i < 100; i++) {
        particlesArray.push(new Particle(evt.x, evt.y))
    }
})
setInterval(draw, 10)