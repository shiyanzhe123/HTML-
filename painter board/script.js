var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var main = document.getElementsByClassName("main")[0]
var tools = document.getElementById("tools")
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;
var cRect = canvas.getBoundingClientRect()
var color = "black"
var draw = false
var size = 1
var range = document.getElementById("range")
range.addEventListener("input", function() {
    size = range.value
})
for (var i = 0; i < 11; i++) {
    let c = i
    var span = document.createElement("span")
    if (i == 0) {
        span.style.background = "black"
    } else {
        span.style.background = "hsl(" + (i - 1) / 10 * 360 + ",100%,50%)"
    }

    span.onclick = function() {
        if (c == 0) {
            color = "black"
        } else {
            color = "hsl(" + (c - 1) / 10 * 360 + ",100%,50%)"
        }
        draw = false
        tools.style.borderColor = color
    }
    tools.appendChild(span)
}
canvas.addEventListener("mousedown", function(evt) {
    draw = true
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(evt.clientX - cRect.left, evt.clientY - cRect.top)
})
canvas.addEventListener("mouseup", function() {
    draw = false
})
canvas.addEventListener("mousemove", function(evt) {
    if (draw) {
        var x = evt.clientX - cRect.left
        var y = evt.clientY - cRect.top
        ctx.lineTo(x, y)
        ctx.stroke()
    }
})

function clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw = false
}