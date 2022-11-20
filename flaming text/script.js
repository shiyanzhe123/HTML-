var text = "fire"
for (var i = 0; i < text.length; i++) {
    var p = document.createElement("p")
    p.className = "text"
    p.innerHTML = text[i]
    document.body.appendChild(p)
}
var fonts = document.getElementsByClassName("text")
var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
let particlesArray = []

class Particle {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.weight = Math.random() * 1.5 + 1.5;
        this.directionX = Math.random() * 2
    }
    update() {
        this.y -= this.weight;
        this.x += this.directionX
        if (this.size > 0.3) {
            this.size -= 0.2
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = 'orange'
        ctx.fill()
    }
}

function handleParticles() {
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].size < 1) {
            particlesArray.splice(i, 1)
        }
    }
}

function createParticle() {
    for (var i = 0; i < fonts.length; i++) {
        main = fonts[i]
        var size = Math.random() * 30 + 10
        var x = main.getBoundingClientRect().left + Math.random() * main.clientWidth
        var y = main.getBoundingClientRect().top + Math.random() * main.clientHeight
        particlesArray.push(new Particle(x, y, size))
    };

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createParticle()
    handleParticles()
}
setInterval(() => {
    draw()
}, 10);