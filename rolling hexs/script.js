let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let hexs = []
let range = 60
class hex {
    constructor(x, y, deg) {
        this.x = x
        this.y = y
        this.deg = deg
        this.r = range
        this.age = 0
    }
    update() {
        this.age++
            if (this.age <= 30) {
                this.deg++
            }
        if (this.age == 90) {
            this.age = 0
        }
    }
    draw() {
        ctx.beginPath()
        let pb = pir(this.x, this.y, this.r, this.deg)
        ctx.moveTo(pb[0], pb[1])
        for (var i = 0; i <= 6; i++) {
            let deg = i * 60 + this.deg
            pb = pir(this.x, this.y, this.r, deg)
            ctx.lineTo(pb[0], pb[1])
        }
        ctx.fillStyle = "hsl(" + this.deg + "deg,30%,50%)"
        ctx.fill()
    }
}

function pir(x, y, r, d) {
    let x1 = r * Math.cos(d * Math.PI / 180) + x
    let y1 = r * Math.sin(d * Math.PI / 180) + y
    return [x1, y1]
}

function init() {
    hexs.push(new hex(canvas.width / 2, canvas.height / 2, 0))
    for (var i = 0; i < 6; i++) {
        for (var j = range * 2; j < canvas.width; j += range * 2) {
            var x = j * Math.cos(i * 60 * Math.PI / 180) + canvas.width / 2
            var y = j * Math.sin(i * 60 * Math.PI / 180) + canvas.height / 2

            for (var m = 1; m < j / (range * 2); m++) {
                var x1 = m * range * 2 * Math.cos((i + 2) * 60 * Math.PI / 180) + x
                var y1 = m * range * 2 * Math.sin((i + 2) * 60 * Math.PI / 180) + y
                if (x1 > -range && x1 < canvas.width + range && y1 > -range && y1 < canvas.height + range) {
                    hexs.push(new hex(x1, y1, j / (range * 2) * 60))
                }
            }
            if (x > -range && x < canvas.width + range && y > -range && y < canvas.height + range) {
                hexs.push(new hex(x, y, j / (range * 2) * 60))
            }
        }
    }
}

init()

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i in hexs) {
        let h = hexs[i]
        h.update()
        h.draw()
    }
}
setInterval(draw, 10);