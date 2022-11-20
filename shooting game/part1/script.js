let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
var img = new Image()
img.src = "ship.png"
let cship = document.createElement("canvas")
let ctxship = cship.getContext("2d")
let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}
class spaceship {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.deg = 45
        this.vx = 0
        this.vy = 0
        this.speed = 5
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        var ex = mouse.x - (ship.x + cship.width / 2)
        var ey = mouse.y - (ship.y + cship.height / 2)
        ship.deg = 360 * Math.atan(ey / ex) / (2 * Math.PI) + 90
        if (ex < 0) {
            ship.deg += 180
        }
    }
}
let ship = new spaceship()
document.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
document.addEventListener("keydown", function(evt) {
    switch (evt.key) {
        case "w":
            ship.vy = -ship.speed
            break;
        case "s":
            ship.vy = ship.speed
            break;
        case "a":
            ship.vx = -ship.speed
            break;
        case "d":
            ship.vx = ship.speed
            break;
    }
})

document.addEventListener("keyup", function(evt) {
    switch (evt.key) {
        case "w":
            ship.vy = 0
            break;
        case "s":
            ship.vy = 0
            break;
        case "a":
            ship.vx = 0
            break;
        case "d":
            ship.vx = 0
            break;
    }
})

img.onload = function() {
    cship.width = img.width * 2
    cship.height = img.width * 2


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ship.update()
        ctxship.clearRect(0, 0, cship.width, cship.height)
        ctxship.save()
        ctxship.translate(cship.width / 2, cship.height / 2)
        ctxship.rotate(ship.deg * Math.PI / 180)
        ctxship.drawImage(img, -img.width / 2, -img.height / 2)
        ctxship.restore()
        ctx.drawImage(cship, ship.x, ship.y)
        requestAnimationFrame(draw)
    }
    draw()
}