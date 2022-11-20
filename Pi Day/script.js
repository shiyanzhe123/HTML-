var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 800
var r = canvas.width / 2
var all = 0
var circle = 0
var pi = document.getElementById("pi")

function drop() {
    for (var i = 0; i < 10000; i++) {
        var x = Math.random() * canvas.width
        var y = Math.random() * canvas.height
        if (Math.sqrt(Math.pow(x - r, 2) + Math.pow(y - r, 2)) <= r) {
            ctx.fillStyle = "#2ecc71"
            circle++
        } else {
            ctx.fillStyle = "#e74c3c"
        }
        all++
        ctx.fillRect(x, y, 0.5, 0.5)
    }

    pi.innerText = (circle * 4 / all)
}
setInterval(drop, 100)