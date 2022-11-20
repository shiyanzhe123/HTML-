let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let img = new Image()
img.src = "tiger.jpg"
let particles = []
let mouse = {
    x: 0,
    y: 0
}
canvas.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
class particle {
    constructor(x, y, c) {
        this.x = x
        this.y = y
        this.vx = x
        this.vy = y
        this.color = c
    }
    update() {
        this.x += (this.vx - this.x) / 20
        this.y += (this.vy - this.y) / 20
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

    }
}

img.onload = function() {
    ctx.drawImage(img, 0, 0)
    let imageData = ctx.getImageData(0, 0, img.width, img.height).data
    ctx.clearRect(0, 0, img.width, img.height)
    for (let i = 0; i < imageData.length / 4; i++) {
        let r = imageData[i * 4]
        let g = imageData[i * 4 + 1]
        let b = imageData[i * 4 + 2]
        let a = imageData[i * 4 + 3]
        let color = "rgba(" + r + "," + g + "," + b + "," + a + ")"
        let x = (i % img.width) * 10 + (canvas.width - img.width * 10) / 2
        let y = (i / img.height | 0) * 10 + (canvas.height - img.height * 10) / 2
        particles.push(new particle(x, y, color))
    }
}

function ani() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i in particles) {
        let p = particles[i]

        p.draw()
        let r = Math.sqrt(Math.pow(p.x - mouse.x, 2) + Math.pow(p.y - mouse.y, 2))
        if (r < 150) {
            p.x -= (mouse.x - p.x) / 10 * (1 - r / 150)
            p.y -= (mouse.y - p.y) / 10 * (1 - r / 150)
        } else {
            p.update()
        }
    }
}
setInterval(ani, 1000 / 60)