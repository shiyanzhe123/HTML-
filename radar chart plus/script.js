var canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 800
var ctx = canvas.getContext("2d")
var ani = [] //动画效果的起始值数组
var mouse = {
    x: 0,
    y: 0
}
var specials = { //用于绘制雷达图的原始数据
    力量: 95,
    感知: 85,
    耐力: 88,
    魅力: 97,
    智商: 80,
    敏捷: 33,
    幸运: 79
}
canvas.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x - canvas.offsetLeft
    mouse.y = evt.y - canvas.offsetTop
})

ctx.font = "15px sans-serif"
for (var j = 0; j < Object.keys(specials).length; j++) { //动画效果值从0开始
    ani.push(0)
}

function drawback(data) { //绘制雷达图背景
    var count = Object.keys(data).length //计算对象长度
    for (var j = 0; j <= 5; j++) { //按照每格20的数量绘制同心多边形
        ctx.beginPath()
        for (var i = 0; i < count; i++) {
            ctx.strokeStyle = "gray"
            ctx.lineWidth = 0.5
            var r = j * 40
            var deg = (i / count * 360 - 45) * Math.PI / 180
            var x = r * Math.sin(deg) + r * Math.cos(deg) + 400
            var y = r * Math.sin(deg) - r * Math.cos(deg) + 400
            ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()

    }
    ctx.beginPath()
    var i = 0
    for (key in data) { //绘制轴线
        ctx.moveTo(400, 400)
        r = 200
        deg = (i * 360 / count - 45) * Math.PI / 180
        x = r * Math.sin(deg) + r * Math.cos(deg) + 400
        y = r * Math.sin(deg) - r * Math.cos(deg) + 400
        ctx.lineTo(x, y)
        ctx.fillStyle = "green"
        ctx.fillText(key, x + 5, y + 7) //根据雷达图端点坐标写入属性名
        i++
    }
    ctx.stroke()
}

function draw(data) {
    var count = Object.keys(data).length
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawback(data) //重绘底图
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "green"
    var i = 0
    for (key in data) { //绘制雷达图
        if (ani[i] < data[key]) { //判断当前数值是否等于数值
            ani[i]++
        }
        var r = ani[i] / 100 * 200 //根据当前数值计算半径
        var deg = (i * 360 / count - 45) * Math.PI / 180
        var x = r * Math.sin(deg) + r * Math.cos(deg) + 400
        var y = r * Math.sin(deg) - r * Math.cos(deg) + 400
        if (Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2)) < 10) { //判断鼠标位置距离端点的距离是否小于10
            var w = ctx.measureText(ani[i]).width
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(x + 20, y - 20, w + 10, 15 + 10) //绘制文字背景
            ctx.fillStyle = "#7bed9f"
            ctx.fillText(ani[i], x + 25, y - 3) //根据鼠标位置写入文字
        }
        ctx.fillStyle = "green"
        ctx.fillRect(x - 3, y - 3, 6, 6)
        ctx.lineTo(x, y)
        i++
    }
    ctx.closePath()
    ctx.fillStyle = "rgba(0,255,0,0.2)"
    ctx.fill()
    ctx.stroke()

}

function animation() {
    draw(specials)
    requestAnimationFrame(animation)
}
animation()