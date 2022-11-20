let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
var img = new Image()
img.src = "sheet.png"
let cship = document.createElement("canvas")
let ctxship = cship.getContext("2d")
let mouse = {
    x: 0,
    y: 0
}
let redline = false //显示瞄准线
let bullets = []
let shoot = false //连射开关
let auto = 10 //射速
let rocknames = [
    "meteorBrown_big1",
    "meteorBrown_big2",
    "meteorBrown_big3",
    "meteorBrown_big4",
    "meteorBrown_med1",
    "meteorBrown_med3"
]
let rocks = []
let stars = []
let fires = []
let run = true
img.onload = function () {
    let xhttp = new XMLHttpRequest()
    xhttp.open("GET", "sheet.xml", false)
    xhttp.send()
    xmlDoc = xhttp.responseXML
    let root = xmlDoc.documentElement
    let nodes = root.children

    function getData(val) {

        for (var i in nodes) {
            var n = nodes[i]
            if (n.getAttribute("name") == val + ".png") {
                var data = []
                var att = n.attributes
                for (var j = 1; j < 5; j++) {
                    data.push(att[j].value)
                }
                return data
            }
        }
    }

    //玩家控制飞船类
    class spaceship {
        constructor(name) {
            this.x = canvas.width / 2
            this.y = canvas.height / 2
            this.speed = 5
            this.vx = 0
            this.vy = 0
            this.deg = 0
            var data = getData(name)
            this.sx = data[0]
            this.sy = data[1]
            this.w = data[2]
            this.h = data[3]
            this.canvas = document.createElement("canvas")
            this.canvas.width = this.canvas.height = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2))
            this.ctx = this.canvas.getContext("2d")
        }
        update() { //边界判断
            if (this.x + this.canvas.width / 2 > canvas.width) {
                this.x = -this.canvas.width / 2
            }
            if (this.x + this.canvas.width / 2 < 0) {
                this.x = canvas.width - this.canvas.width / 2
            }
            this.x += this.vx
            if (this.y + this.canvas.height / 2 > canvas.height) {
                this.y = -this.canvas.height / 2
            }
            if (this.y + this.canvas.height / 2 < 0) {
                this.y = canvas.height - this.canvas.height / 2
            }
            this.y += this.vy
            var ex = mouse.x - (this.x + this.canvas.width / 2)
            var ey = mouse.y - (this.y + this.canvas.height / 2)
            this.deg = 360 * Math.atan(ey / ex) / (2 * Math.PI) + 90
            if (ex < 0) {
                this.deg += 180
            }
        }
        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.save()
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
            this.ctx.rotate(this.deg * Math.PI / 180)
            this.ctx.drawImage(img, this.sx, this.sy, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h)
            this.ctx.restore()
            ctx.drawImage(this.canvas, this.x, this.y)
        }
    }
    let ship = new spaceship("playerShip1_red")
    //根据元素名获取元素信息

    //石头类
    class rock {
        constructor(name) {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            var data = getData(name)
            this.sx = data[0]
            this.sy = data[1]
            this.w = data[2]
            this.h = data[3]
            this.deg = 0
            this.vx = Math.random() - 0.5
            this.vy = Math.random() - 0.5
            this.canvas = document.createElement("canvas")
            this.hp = this.canvas.width = this.canvas.height = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2))
            this.ctx = this.canvas.getContext("2d")
        }
        update() {
            this.x += this.vx * 5
            this.y += this.vy * 5
            this.deg++
            if (this.x < 0 || this.x + this.w > canvas.width) {
                this.vx = -this.vx
            }
            if (this.y < 0 || this.y + this.h > canvas.height) {
                this.vy = -this.vy
            }
        }
        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.save()
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
            this.ctx.rotate(this.deg * Math.PI / 180)
            this.ctx.drawImage(img, this.sx, this.sy, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h)
            this.ctx.restore()
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(0, 0, this.hp, 5)
            ctx.drawImage(this.canvas, this.x, this.y)
        }
    }


    class bullet { //子弹类
        constructor() {
            this.deg = ship.deg - 90
            this.x = ship.x + ship.canvas.width / 2 + 40 * Math.cos(this.deg * Math.PI / 180)
            this.y = ship.y + ship.canvas.height / 2 + 40 * Math.sin(this.deg * Math.PI / 180)
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
    class star { //背景闪烁的星星类
        constructor() {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.age = Math.random() * 100 | 0 + 200
            this.p = this.age / 2
            this.size = Math.random() * 2
        }
        update() {
            this.age--
        }
        draw() {
            ctx.fillStyle = "rgba(255,255,255," + (1 - Math.abs(this.p - this.age) / this.p) + ")"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, 0)
            ctx.fill()
        }
    }
    class fire { //火花类
        constructor(x, y) {
            this.x = x
            this.y = y
            this.vx = 0.5 - Math.random()
            this.vy = 0.5 - Math.random()
            this.age = Math.random() * 100 | 0
        }
        update() {
            this.x += this.vx
            this.y += this.vy
            this.age--
        }
        draw() {
            ctx.fillStyle = "rgba(255, 165, 2,0.6)"
            ctx.beginPath()
            ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, 0)
            ctx.fill()
        }

    }
    //控制飞船
    document.addEventListener("mousemove", function (evt) {
        mouse.x = evt.x
        mouse.y = evt.y
    })
    document.addEventListener("click", function () { //点击射击
        if (run) {
            bullets.push(new bullet())
        }

    })
    document.addEventListener("mousedown", function () { //按住射击
        shoot = true
    })
    document.addEventListener("mouseup", function () { //松开停止
        shoot = false
    })


    document.addEventListener("keydown", function (evt) {
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
    document.addEventListener("keyup", function (evt) {
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

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (var i in stars) {
            var s = stars[i]
            s.update()
            s.draw()
            if (s.age < 0) {
                stars.splice(i, 1)
            }
        }
        if (stars.length < 100) {
            stars.push(new star())
        }
        if (run) {
            ship.update()
            ship.draw()
        }



        if (redline) { //绘制瞄准线
            ctx.beginPath()

            var sx = ship.x + cship.width / 2 + 40 * Math.cos((ship.deg - 90) * Math.PI / 180)
            var sy = ship.y + cship.height / 2 + 40 * Math.sin((ship.deg - 90) * Math.PI / 180)
            ctx.moveTo(sx, sy)
            ctx.lineTo(sx + canvas.width * 2 * Math.cos((ship.deg - 90) * Math.PI / 180), sy + canvas.width * 2 * Math.sin((ship.deg - 90) * Math.PI / 180))
            ctx.strokeStyle = "rgba(255,0,0,0.8)"
            ctx.stroke()
        }
        for (var i in bullets) { //绘制子弹
            var b = bullets[i]
            b.update()
            b.draw()
            if (b.x > canvas.width || b.x < 0 || b.y > canvas.height || b.y < 0) {
                bullets.splice(i, 0)
            }
        }
        if (shoot && run) { //自动射击
            if (auto == 10) {
                bullets.push(new bullet())
                auto = 0
            }
            auto++
        }
        for (var i in rocks) {
            var r = rocks[i]
            if (run) {
                r.update()
            }

            r.draw()
            for (var j in bullets) { //击中检测
                var b = bullets[j]
                if (Math.sqrt(Math.pow(b.x - (r.x + r.canvas.width / 2), 2) + Math.pow(b.y - (r.y + r.canvas.height / 2), 2)) < r.canvas.width / 3) {
                    r.hp -= 10 //石头耐久度下降
                    bullets.splice(j, 1)
                    for (var m = 0; m < 50; m++) {
                        fires.push(new fire(b.x, b.y))
                    }
                }
            }
            if (r.hp < 0) { //判断石头HP
                for (var n = 0; n < r.canvas.width; n++) {
                    fires.push(new fire(Math.random() * r.canvas.width + r.x, Math.random() * r.canvas.height + r.y))
                }
                rocks.splice(i, 1)
            }
            var rc = {
                x: r.x + r.canvas.width / 2,
                y: r.y + r.canvas.height / 2
            }
            var sc = {
                x: ship.x + ship.canvas.width / 2,
                y: ship.y + ship.canvas.width / 2
            }
            if (Math.sqrt(Math.pow(rc.x - sc.x, 2) + Math.pow(rc.y - sc.y, 2)) < r.canvas.width / 2 + ship.canvas.width / 2) {
                run = false

                for (var n = 0; n < 500; n++) {
                    fires.push(new fire(sc.x, sc.y))
                }
                ship.x = -200
                ship.y = -200

            }
        }
        if (rocks.length < 10) {
            rocks.push(new rock(rocknames[Math.random() * rocknames.length | 0]))

        }

        for (var i in fires) {
            var f = fires[i]
            f.update()
            f.draw()
            if (f.age < 0) {
                fires.splice(i, 1)
            }
        }
        requestAnimationFrame(draw)
    }
    draw()
}