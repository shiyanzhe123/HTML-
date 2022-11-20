var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
window.document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.setAttribute('style', 'position:fixed;left:0;top:0;pointer-events:none;')
var evt = {}
var start = false
var fires = []
var colors = [
    "236, 204, 104",
    "255, 165, 2",
    "255, 99, 72",
    "255, 71, 87",
    "123, 237, 159",
    "112, 161, 255",
    "223, 228, 234"
]
window.addEventListener("mousemove", function (ev) {
    var x = ev.clientX
    var y = ev.clientY
    if (document.elementFromPoint(x, y).nodeName == "BUTTON") {
        evt = document.elementFromPoint(x, y)
        start = true
    }
    else {
        start = false
    }
})

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < fires.length; i++) {
        fire = fires[i]
        ctx.beginPath()
        ctx.fillStyle = "rgba(" + fire.color + "," + fire.age / fire.life + ")"
        // ctx.fillRect(fire.sx, fire.sy + evt.clientHeight + 4, 2, 2)
        ctx.arc(fire.sx, fire.sy + evt.clientHeight + 4,fire.size,0,2*Math.PI)
        ctx.fill()
        fire.sy += fire.vy / 3
        // fire.sx += 0.5-Math.random()
        fire.age--
        if (fire.age < 0) {
            fires.splice(i, 1)
        }
    }
    if (fires.length < evt.clientWidth * 10 && start) {
        fires.push({
            sx: Math.random() * (evt.clientWidth) + evt.getBoundingClientRect().left,
            sy: evt.getBoundingClientRect().top,
            vy: Math.random(),
            size:Math.random()*2,
            color: colors[parseInt(Math.random() * colors.length)],
            age: evt.clientHeight * 5,
            life: evt.clientHeight
        }
        )
    }
}
setInterval(draw, 1);
