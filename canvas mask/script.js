var main = document.getElementsByClassName("main")[0]
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")

canvas.setAttribute("style", "background:black;mix-blend-mode: multiply;filter:blur(2px);")
main.appendChild(canvas)
canvas.width = main.clientWidth
canvas.height = main.clientHeight
var cRect = canvas.getBoundingClientRect()
var mouse = {
    x: -100,
    y: -100
}
var balls = []
var fires = []
window.addEventListener("mousemove", function(evt) {
    var x = evt.clientX - cRect.left
    var y = evt.clientY - cRect.top
    mouse = {
        x: x,
        y: y
    }
    fires.push({
        x: mouse.x,
        y: mouse.y,
        vx: 0.5 - Math.random(),
        vy: 0.5 - Math.random()
    })
})

function draw() {
    var k = 0
    var r = 0
    var deg = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"
    for (var i = 0; i < balls.length; i++) {
        ball = balls[i]
        ctx.beginPath()
        ctx.arc(ball.x + mouse.x, ball.y + mouse.y,
            ball.size, 0, 2 * Math.PI)
        ctx.fill()
        ball.x += ball.vx
        ball.y += ball.vy
        if (Math.sqrt(Math.pow(ball.x, 2) + Math.pow(ball.y, 2)) > 100 + ball.size) {
            balls.splice(i, 1)
        }
    }
    for (var i = 0; i < fires.length; i++) {
        fire = fires[i]
        ctx.beginPath()
        ctx.arc(fire.x, fire.y,
            3, 0, 2 * Math.PI)
        ctx.fill()
        fire.x += fire.vx * 5
        fire.y += fire.vy * 5
        if (fire.x > canvas.width || fire.y > canvas.height) {
            fires.splice(i, 1)
        }
    }
    if (balls.length < 1000) {
        deg = Math.random() * 360
        k = Math.random()
        r = Math.sqrt(k) * 100
        balls.push({
            x: r * Math.sin(deg),
            y: r * Math.cos(deg),
            size: Math.random() * 30,
            vx: 0.5 - Math.random(),
            vy: 0.5 - Math.random()
        })
    }
    // ctx.beginPath()
    // ctx.arc(mouse.x, mouse.y, 100, 0, 2 * Math.PI)
    // ctx.fill()
}
draw()
setInterval(draw, 10)