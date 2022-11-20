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
let shoot = false // 射击状态切换
let auto = 15 //射击频率
let redline = false
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
        if (this.x + cship.width / 2 > canvas.width) {
            this.x = 0 - cship.width / 2
        }
        if (this.x + cship.width / 2 < 0) {
            this.x = canvas.width - cship.width / 2
        } else {
            this.x += this.vx
        }

        if (this.y + cship.height / 2 > canvas.height) {
            this.y = -cship.height / 2
        }
        if (this.y + cship.height / 2 < 0) {
            this.y = canvas.height - cship.height / 2
        } else {
            this.y += this.vy
        }

        var ex = mouse.x - (ship.x + cship.width / 2)
        var ey = mouse.y - (ship.y + cship.height / 2)
        ship.deg = 360 * Math.atan(ey / ex) / (2 * Math.PI) + 90
        if (ex < 0) {
            ship.deg += 180
        }
    }
}
let bullets = [] //子弹数组
class bullet { //子弹类
    constructor() {
        this.deg = ship.deg - 90
        this.x = ship.x + cship.width / 2 + 40 * Math.cos(this.deg * Math.PI / 180)
        this.y = ship.y + cship.height / 2 + 40 * Math.sin(this.deg * Math.PI / 180)
        this.r = 20
        this.color = "red"
    }
    update() {
        this.x = this.x + this.r * Math.cos(this.deg * Math.PI / 180)
        this.y = this.y + this.r * Math.sin(this.deg * Math.PI / 180)
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, 0)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
let ship = new spaceship()
document.addEventListener("mousedown", function(evt) {
    shoot = true
})
document.addEventListener("mouseup", function(evt) {
    shoot = false
})
document.addEventListener("click", function() {
    bullets.push(new bullet())
})
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
    ctx.strokeStyle = "rgba(255,0,0,0.5)"

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
            // 绘制瞄准激光
        if (redline) {
            ctx.beginPath()
            ctx.moveTo(ship.x + cship.width / 2 + 40 * Math.cos((ship.deg - 90) * Math.PI / 180), ship.y + cship.height / 2 + 40 * Math.sin((ship.deg - 90) * Math.PI / 180))
                // ctx.moveTo(ship.x + cship.width / 2, ship.y + cship.height / 2)
            ctx.lineTo(ship.x + cship.width / 2 + canvas.width * Math.cos((ship.deg - 90) * Math.PI / 180), ship.y + cship.height / 2 + canvas.width * Math.sin((ship.deg - 90) * Math.PI / 180))
            ctx.stroke()
        }
        //激光绘制结束
        //绘制子弹
        if (shoot) {
            if (auto == 15) {
                bullets.push(new bullet())
                auto = 0
            }
            auto++
        }
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i]
            b.update()
            b.draw()
            if (b.x > canvas.width || b.x < 0 || b.y > canvas.height || b.y < 0) {
                bullets.splice(i, 1)
            }
        }
        requestAnimationFrame(draw)
    }
    draw()
}