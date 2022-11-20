let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let count = 0
let color = "#1e90ff"
let numbers = []
let l = canvas.width / 20 | 0
let t = canvas.height / 20 | 0
let ind = 10

function init() {
    for (let i = 0; i <= 10; i++) {
        ctx.font = "40px Arial"
        let span = document.createElement("span")
        span.style.fontSize = "40px"
        span.style.fontFamily = "Arial"
        span.innerHTML = i
        document.body.appendChild(span)
        let width = span.offsetWidth
        let height = span.offsetHeight
        span.remove()
        ctx.fillText(i, 0, height)
        let data = ctx.getImageData(0, 0, width, height).data
        let len = data.length
        let tdata = []
        for (let j = 0; j < len / 4; j++) {
            if (data[j * 4 + 3] != 0) {
                let x = j % width | 0
                let y = j / width | 0
                x = (x + (l / 2 - width / 2) | 0) * 20
                y = (y - 4 + (t / 2 - height / 2) | 0) * 20
                tdata.push([x, y])
            }
        }
        numbers.push(tdata)
        ctx.clearRect(0, 0, width, height)
    }

}
init()

function ani() {
    count++
    ctx.fillStyle = "rgba(255,255,255,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = color
    for (let i = 0; i <= l; i++) {
        for (let j = 0; j <= t; j++) {
            ctx.beginPath()
            ctx.arc(i * 20, j * 20, (60 - Math.abs(60 - count)) / 10, 0, Math.PI * 2)
            ctx.fill()
        }
    }
    let str = numbers[ind]
    for (let i in str) {
        let s = str[i]
        ctx.beginPath()
        ctx.arc(s[0], s[1], 6, 0, Math.PI * 2)
        ctx.fill()
    }
    // if (count == 120) { //视频里的方法，效率太差，改成取余了
    //     count = 0
    // }
    count = count % 120
    if (count == 60) {
        ind--
        if (ind == -1) {
            ind = 10
        }
    }

}
setInterval(ani, 1000 / 60)