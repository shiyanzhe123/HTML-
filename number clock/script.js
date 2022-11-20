let canvas = document.getElementById("canvas")
canvas.width = 720
canvas.height = 180
let ctx = canvas.getContext("2d")
let clocks = []
let numbers = [
    [ //0
        0, 1, 0, 2, 0, 2, 1, 2,
        1, 3, 0, 1, 1, 2, 1, 3,
        1, 3, 1, 3, 1, 3, 1, 3,
        1, 3, 1, 3, 1, 3, 1, 3,
        1, 3, 0, 3, 2, 3, 1, 3,
        0, 3, 0, 2, 0, 2, 2, 3
    ],
    [ //1
        0, 1, 0, 2, 1, 2, 1, 1,
        0, 3, 1, 2, 1, 3, 3, 3,
        1, 1, 1, 3, 1, 3, 1, 1,
        3, 3, 1, 3, 1, 3, 3, 3,
        0, 1, 2, 3, 0, 3, 2, 1,
        3, 0, 2, 0, 2, 0, 2, 3
    ],
    [ //2
        0, 1, 0, 2, 0, 2, 1, 2,
        0, 3, 0, 2, 1, 2, 1, 3,
        0, 1, 0, 2, 2, 3, 1, 3,
        1, 3, 0, 1, 0, 2, 2, 3,
        1, 3, 0, 3, 0, 2, 1, 2,
        0, 3, 0, 2, 0, 2, 2, 3
    ],
    [ //3
        0, 1, 0, 2, 0, 2, 1, 2,
        0, 3, 0, 2, 1, 2, 1, 3,
        0, 1, 0, 2, 2, 3, 1, 3,
        0, 3, 0, 2, 1, 2, 1, 3,
        0, 1, 0, 2, 2, 3, 1, 3,
        0, 3, 0, 2, 0, 2, 2, 3
    ],
    [ //4
        0, 1, 1, 2, 0, 1, 1, 2,
        1, 3, 1, 3, 1, 3, 1, 3,
        1, 3, 0, 3, 2, 3, 1, 3,
        0, 3, 0, 2, 1, 2, 1, 3,
        0, 0, 2, 2, 1, 3, 1, 3,
        0, 0, 2, 2, 0, 3, 2, 3
    ],
    [ //5
        0, 1, 0, 2, 0, 2, 1, 2,
        1, 3, 0, 1, 0, 2, 2, 3,
        1, 3, 0, 3, 0, 2, 1, 2,
        0, 3, 0, 2, 1, 2, 1, 3,
        0, 1, 0, 2, 2, 3, 1, 3,
        0, 3, 0, 2, 0, 2, 2, 3
    ],
    [ //6
        0, 1, 0, 2, 0, 2, 1, 2,
        1, 3, 0, 1, 0, 2, 2, 3,
        1, 3, 0, 3, 0, 2, 1, 2,
        1, 3, 0, 1, 2, 1, 1, 3,
        1, 3, 0, 3, 2, 3, 1, 3,
        0, 3, 0, 2, 0, 2, 2, 3
    ],
    [ //7
        0, 1, 0, 2, 0, 2, 1, 2,
        1, 3, 0, 1, 1, 2, 1, 3,
        0, 3, 2, 3, 1, 3, 1, 3,
        0, 0, 2, 2, 1, 3, 1, 3,
        0, 0, 2, 2, 1, 3, 1, 3,
        0, 0, 2, 2, 0, 3, 2, 3
    ],
    [ //8
        0, 1, 0, 2, 0, 2, 1, 2,
        1, 3, 0, 1, 1, 2, 1, 3,
        1, 3, 0, 3, 2, 3, 1, 3,
        1, 3, 0, 1, 2, 1, 1, 3,
        1, 3, 0, 3, 2, 3, 1, 3,
        0, 3, 0, 2, 0, 2, 2, 3
    ],
    [ //9
        0, 1, 0, 2, 0, 2, 1, 2,
        1, 3, 0, 1, 1, 2, 1, 3,
        1, 3, 0, 3, 2, 3, 1, 3,
        0, 3, 0, 2, 1, 2, 1, 3,
        0, 1, 2, 0, 2, 3, 1, 3,
        0, 3, 2, 0, 0, 2, 2, 3
    ]
]
ctx.lineWidth = 4
class clock {
    constructor(x, y) {
        this.d1 = 0
        this.d2 = 1
        this.td1 = 2
        this.td2 = 2
        this.x = x
        this.y = y
    }
    update() {
        this.d1 += (this.td1 - this.d1) / 10
        this.d2 += (this.td2 - this.d2) / 10
    }
    draw() {
        let x1 = 15 * Math.cos(this.d1 * Math.PI / 2) + this.x
        let y1 = 15 * Math.sin(this.d1 * Math.PI / 2) + this.y
        let x2 = 15 * Math.cos(this.d2 * Math.PI / 2) + this.x
        let y2 = 15 * Math.sin(this.d2 * Math.PI / 2) + this.y
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }

}

function init() {
    for (let j = 0; j < 6; j++) {
        let data = []
        for (let i = 0; i < 24; i++) {
            let x = (i % 4) * 30 + 15
            let y = (i / 4 | 0) * 30 + 15
            x = x + j * 120
            data.push(new clock(x, y))
        }
        clocks.push(data)
    }
}
init()
function change(ind, n) {
    for (let i in clocks[ind]) {
        let c = clocks[ind][i]
        c.td1 = numbers[n][i * 2]
        c.td2 = numbers[n][i * 2 + 1]
    }
}
function tik() {
    let d = new Date()
    let str = ("0" + d.getHours()).slice(-2) +
        ("0" + d.getMinutes()).slice(-2) +
        ("0" + d.getSeconds()).slice(-2)
    for (let i in str) {
        change(i, str[i])
    }
}
setInterval(tik, 1000)
function ani() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (j in clocks) {
        ctx.strokeStyle = "hsl(" + j * 60 + ",80%,50%)"
        for (let i in clocks[j]) {
            let c = clocks[j][i]
            c.update()
            c.draw()
        }
    }
}
setInterval(() => {
    ani()
}, 100 / 6);