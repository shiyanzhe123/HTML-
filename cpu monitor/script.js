var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 400
var xhr = new XMLHttpRequest()
var cpu = []
function getcpu() {
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            if (cpu.length >= 100) {
                cpu.splice(0, 1)
            }
            cpu.push(xhr.responseText)
        }
    }
    xhr.open("GET", "http://localhost:5050/cpu", true)
    xhr.send()
}

function init(){
    ctx.strokeStyle="gray"
    ctx.beginPath()
    ctx.lineWidth=1
    ctx.moveTo(100, 300)
    ctx.lineTo(700, 300)
    ctx.stroke()
    ctx.beginPath()
    for (var i = 0; i <= 10; i++) {
        ctx.moveTo(100, i * 20 + 100)
        ctx.lineTo(700, i * 20 + 100)
        ctx.direction="rtl"
        ctx.fillStyle="gray"
        ctx.fillText((10 - i) * 10, 90, i * 20 + 107)
    }
    
    ctx.lineWidth = 0.3
    ctx.stroke()
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    init()
    getcpu()
    ctx.strokeStyle='rgba(70,255,70,0.5)'
    ctx.beginPath()
    for (var i = cpu.length; i >= 0; i--) {
        var x = 600 * i / 100 + 700 - (cpu.length / 100 * 600)
        var y = 300 - cpu[i] *2
        ctx.lineTo(x,y)
    }
    ctx.lineWidth=1
    ctx.stroke()
    ctx.closePath()
}
setInterval(() => {
    draw()
}, 1000);