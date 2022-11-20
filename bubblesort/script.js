var canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 400
var ctx = canvas.getContext("2d")

var lists = []
for (var i = 0; i < 200; i++) {
    lists.push(Math.random() * canvas.height | 0)
}
var count = lists.length
function check(x, y) {
    if (x < y) {
        return ([x, y])
    }
    return ([y, x])
}
function sort(c) {
    for (var i = 0; i < c; i++) {
        temp = check(lists[i], lists[i + 1])
        lists[i] = temp[0]
        lists[i + 1] = temp[1]
    }
}
function draw() {
    sort(count)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < lists.length; i++) {
        ctx.fillStyle = "hsl(" + lists[i] * 360 / canvas.height + "deg,80%,50%)"
        ctx.fillRect(i * canvas.width / lists.length, lists[i], canvas.width / lists.length - 2, canvas.height - lists[i])
    }
    count--
}
setInterval(draw, 100)