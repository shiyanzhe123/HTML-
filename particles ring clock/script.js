let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.position = "fixed"
let ctx = canvas.getContext("2d")
let rings = []
let particles = []
let numbers = []
let last = ""
let colors = ['#1e90ff', '#1e90ff', '#ffa502', '#ffa502', '#2ed573', '#2ed573']
class ring {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.deg = Math.random() * Math.PI * 2
        this.r = 200 + Math.random() * 10 | 0
        this.vd = Math.random() * Math.PI * 2 / 360 + 0.01
        this.color = "hsl(" + (Math.random() * 360 | 0) + ",80%,50%)"
        this.dx = this.r * Math.cos(this.deg) + this.x
        this.dy = this.r * Math.sin(this.deg) + this.y
    }
    update() {
        this.deg += this.vd
        this.deg = this.deg % (Math.PI * 2)
        this.dx = this.r * Math.cos(this.deg) + this.x
        this.dy = this.r * Math.sin(this.deg) + this.y
    }
    draw() {

        ctx.beginPath()
        ctx.arc(this.dx, this.dy, 1, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class particle {
    constructor(x, y, tx, ty, color = "gray") {
        this.x = x
        this.y = y
        this.sx = (tx - x) / 100
        this.sy = (ty - y) / 100
        this.tx = tx
        this.ty = ty
        this.color = color
        this.age = 100
    }
    update() {
        this.age--
            if (this.age >= 0) {
                this.x += this.sx
                this.y += this.sy
            }


    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx.fill()
    }
}



function init() {
    for (let i = 0; i < 10; i++) { //循环0-9
        ctx.font = "24px Arial" //设置字体及字型
        let span = document.createElement("span") //创建span元素
        span.style.fontSize = "24px" //根据设置的字体和字型设置span样式
        span.style.fontFamily = "Arial"
        span.innerHTML = i //将数字写入span
        document.body.appendChild(span) //将span作为子元素插入页面
        let width = span.offsetWidth //获取span的尺寸
        let height = span.offsetHeight
        span.remove() //移除span
        ctx.fillText(i, 0, height) //根据获得的字型高度写入画布
        let data = ctx.getImageData(0, 0, width, height).data //根据获得的span尺寸截取画布信息
        let len = data.length //获取数组长度
        let tdata = [] //创建储存单个字符的数组
        for (let j = 0; j < len / 4; j++) { //按照每四个数字对应一个像素信息的方法遍历所有像素
            if (data[j * 4 + 3] != 0) { //如果这个像素不是全透明的话则记录像素的坐标
                let x = j % width | 0
                let y = j / width | 0
                tdata.push({ //将像素坐标作为对象存入数组
                    x: x,
                    y: y
                })
            }
        }
        numbers.push(tdata) //将对应字符的坐标数据存入数组
        ctx.clearRect(0, 0, width, height) //清理画布
    }
    for (let i = 0; i < 200; i++) {
        rings.push(new ring())
    }
}
init()




function clock() {
    let d = new Date()
    return ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2)
}

function ani() {
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i in rings) {
        let r = rings[i]
        r.update()
        r.draw()
    }
    for (let i in particles) {
        let p = particles[i]
        p.update()
        p.draw()
        if (p.age == -100) {
            particles.splice(i, 1)
        }
    }

}
setInterval(ani, 10)
setInterval(() => {
    let now = clock()
    for (let i in now) {
        let color = colors[i]
        for (let j in numbers[now[i]]) {
            let n = numbers[now[i]][j]
            let r = rings[j]
            if (now[i] != last[i]) {
                particles.push(new particle(r.dx, r.dy, n.x * 4 + (canvas.width / 2 - 180 + 60 * i), n.y * 4 + canvas.height / 2 - 60, color))
            } else {
                particles.push(new particle(n.x * 4 + (canvas.width / 2 - 180 + 60 * i), n.y * 4 + canvas.height / 2 - 60, n.x * 4 + (canvas.width / 2 - 180 + 60 * i), n.y * 4 + canvas.height / 2 - 60, color))
            }
        }
    }
    last = now
}, 1000);