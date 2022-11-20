var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var cRect = canvas.getBoundingClientRect()
var fires = []
var balls = []
var mouse = { x: -100, y: -100 }
var ctime = 0
var start = document.getElementById("start")
canvas.width = 800
canvas.height = 600
window.addEventListener("click", function (evt) { //鼠标点击事件改变点击目标
    var x = evt.clientX - cRect.left
    var y = evt.clientY - cRect.top
    mouse.x = x
    mouse.y = y
})
function newgame() { //初始化并开始游戏
    start.style.display = "none"
    for (var i = 0; i < 10; i++) {
        balls.push({
            sx: parseInt(Math.random() * (canvas.width - 60)) + 30, //确保气球生成范围为 30~770
            sy: parseInt(Math.random() * (canvas.height - 60)) + 30, //气球范围为 30~570
            vx: 0.5 - Math.random(),
            vy: 0.5 - Math.random(),
            size: Math.random() * 10 + 15,
            color: color()
        })
    }
}
function color() { //随机生成颜色代码
    return "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")"
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "30px sans-serif"
    ctx.fillStyle = "#1e90ff"
    ctx.fillText(ctime, 10, 40)
    for (var i = 0; i < balls.length; i++) { //绘制气球
        ball = balls[i]
        ctx.fillStyle = ball.color
        ctx.beginPath()
        ctx.arc(ball.sx, ball.sy, ball.size, 0, 2 * Math.PI)
        ctx.fill()
        ball.sx += ball.vx
        ball.sy += ball.vy
        if (ball.sx - ball.size < 0 || ball.sx + ball.size > canvas.width) {
            ball.vx = -ball.vx
        }
        if (ball.sy - ball.size < 0 || ball.sy + ball.size > canvas.height) {
            ball.vy = -ball.vy
        }
        if (Math.sqrt(Math.pow((mouse.x - ball.sx), 2) + Math.pow((mouse.y - ball.sy), 2)) < ball.size) { //判断点击位置是否在气球范围内，
            for (var j = 0; j < 50; j++) { //如果点到气球，则插入爆炸效果的元素
                fires.push({
                    sx: ball.sx,
                    sy: ball.sy,
                    vx: 0.5 - Math.random(),
                    vy: 0.5 - Math.random(),
                    color: color(),
                    age: 200
                })
            }
            balls.splice(i, 1)
        }
    }
    for (var i = 0; i < fires.length; i++) {  //绘制爆炸效果
        fire = fires[i]
        ctx.fillStyle = fire.color
        ctx.fillRect(fire.sx, fire.sy, 4, 4)
        fire.age--
        fire.sx += fire.vx
        fire.sy += fire.vy
        fire.vy += 0.008 //加入向下的加速度
        if (fire.age < 0) {
            fires.splice(i, 1)
        }
    }
    mouse.x = -100 //每次循环都将点击坐标移出画布
    mouse.y = -100
    if (balls.length > 0) { //有气球的情况下刷新计分器
        ctime++
    }
}
setInterval(draw, 1)
