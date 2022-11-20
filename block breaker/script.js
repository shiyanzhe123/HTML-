var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600
var blocks = [] //砖块数组
var board = { //反弹板
    x: 350,
    y: 580,
    long: 100
}
var cRect = canvas.getBoundingClientRect() //画布位置
var ball = { //定义弹球对象
    color: "white"
}
var score = 0 //分数
var rungame = false //默认运行状态
var colors = [ //颜色数组
    "#eccc68",
    "#ff7f50",
    "#ff6b81",
    "#7bed9f",
    "#5352ed",
    "#70a1ff"
]
var speed = 0.3 //弹球移动速度
var run = document.getElementById("start")
var fires = [] //烟火数组
function start() {
    newgame()
    rungame = true
    run.style.display = "none"
    canvas.style.cursor = "none"
}
window.addEventListener("mousemove", function(evt) { //移动鼠标变更反弹板位置
    var x = evt.clientX - cRect.left
    if (x < 50) {
        board.x = 0
    } else if (x > 750) {
        board.x = 700
    } else {
        board.x = x - 50
    }
    console.log(x)
})

function newgame() { //初始化游戏
    ball = { //默认的弹球位置，随机方向
        sx: 400,
        sy: 300,
    }
    ball.vx = (0.5 - Math.random()) * speed
    ball.vy = Math.sqrt(speed * speed - ball.vx * ball.vx)
    score = 0
    blocks = []
    for (var i = 0; i < 10; i++) { //生成砖块
        for (var j = 0; j < 6; j++) {
            blocks.push({
                x: i,
                y: j,
                color: colors[parseInt(Math.random() * colors.length)]
            })
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, 800, 600)


    for (var i = 0; i < blocks.length; i++) { //绘制砖块
        block = blocks[i]
        ctx.fillStyle = block.color
        ctx.fillRect(block.x * 80 + 1, block.y * 30 + 1, 79, 29)
        if (ball.sx + 10 > block.x * 80 + 1 && ball.sx - 10 < block.x * 80 + 80 && ball.sy + 10 > block.y * 30 + 1 && ball.sy - 10 < block.y * 30 + 30) { //砖块碰撞判断

            if (ball.sx > block.x * 80 + 80 || ball.sx < block.x * 80) { //左右方向碰撞则改变x轴运行方向
                ball.vx = -ball.vx
            } else if (ball.sy > block.y * 30 + 30 || ball.sy < block.y * 30) { //垂直方向碰撞则改变Y轴运行方向
                ball.vy = -ball.vy
            }
            if (ball.color == block.color) { //同色碰撞则加10分
                score += 10
            } else { //非同色碰撞加1分
                score++
            }
            ball.color = block.color //撞击后球的颜色变成砖块颜色
            blocks.splice(i, 1) //碰撞后砖块消失
            for (var f = 0; f < 50; f++) { //生成火花
                fires.push({
                    sx: block.x * 80 + 40,
                    sy: block.y * 30 + 15,
                    color: block.color,
                    vx: 0.5 - Math.random(),
                    vy: 0.5 - Math.random(),
                    age: 100
                })
            }
        }
    }
    ctx.fillStyle = "white" //绘制分数
    ctx.font = "20px sans-serif"
    ctx.fillText(score, 5, 25)
    ctx.fillRect(board.x, board.y, board.long, 20) //绘制反弹板
    ctx.beginPath() //绘制小球
    ctx.fillStyle = ball.color
    ctx.arc(ball.sx, ball.sy, 10, 0, 2 * Math.PI)
    ctx.fill()

    if (rungame) { //判断游戏运行状态，并刷新球的位置
        ball.sx += ball.vx * 5
        ball.sy += ball.vy * 5
        if (ball.sy < 10) { //上边缘碰撞判断
            ball.vy = -ball.vy
        }
        if (ball.sx < 10 || ball.sx > 795) { //左右碰撞判断
            ball.vx = -ball.vx
        }
        if (ball.sy > 570 && ball.sx > board.x && ball.sx < board.x + board.long) { //反弹板碰撞判断
            ball.vx = (ball.sx - (board.x + board.long / 2)) / board.long / 2 * speed * 3
            ball.vy = -Math.sqrt(speed * speed - ball.vx * ball.vx)
            speed = speed * 1.001
            for (var f = 0; f < 20; f++) {
                fires.push({
                    sx: ball.sx,
                    sy: ball.sy + 10,
                    color: colors[parseInt(Math.random() * colors.length)],
                    vx: 0.5 - Math.random(),
                    vy: Math.random() - 1,
                    age: 60
                })
            }

        }
        if (ball.sy > 590 || blocks.length <= 0) { //碰撞到底部或所有砖块都消失则游戏停止运行
            rungame = false
            run.style.display = "flex"
            canvas.style.cursor = "default"
            for (var f = 0; f < 150; f++) {
                fires.push({
                    sx: 400,
                    sy: 300,
                    color: colors[parseInt(Math.random() * colors.length)],
                    vx: 0.5 - Math.random(),
                    vy: 0.5 - Math.random(),
                    age: 560
                })
            }
        }
    }
    for (var i = 0; i < fires.length; i++) {
        fire = fires[i]
        ctx.fillStyle = fire.color
        ctx.fillRect(fire.sx, fire.sy, 2, 2)
        fire.age--
            if (fire.age < 0) {
                fires.splice(i, 1)
            }
        fire.sx += fire.vx * 2
        fire.sy += fire.vy * 2

    }
}
newgame()
setInterval(draw, 1);