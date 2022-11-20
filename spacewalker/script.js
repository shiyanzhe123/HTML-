var back = document.getElementsByClassName("back")[0]
var clock = document.getElementsByClassName("clock")[0]
var stars = []
var fires = []
function draw() {
    var now = new Date()
    var clockstr = ("0" + now.getHours()).slice(-2)
    clockstr += ":" + ("0" + now.getMinutes()).slice(-2)
    clockstr += ":" + ("0" + now.getSeconds()).slice(-2)
    clock.innerHTML = clockstr
    back.innerHTML = ""
    for (var i = 0; i < stars.length; i++) {
        star = stars[i]
        var span = document.createElement("span")
        span.style.top = star.sy + "px"
        span.style.left = star.sx + "px"
        span.style.width = span.style.height = star.size + "px"
        span.style.opacity = (100 - star.age % 100) / 100
        back.appendChild(span)
        star.age++
        if (star.age > 200) {
            stars.splice(i, 1)
        }
    }
    if (stars.length < 100) {
        stars.push({
            sx: Math.random() * back.clientWidth,
            sy: Math.random() * back.clientHeight,
            size: Math.random() * 5,
            age: Math.random() * 30
        })
    }
    for (var i = 0; i < fires.length; i++) {
        fire = fires[i]
        var span = document.createElement("span")
        span.style.top = fire.sy + "px"
        span.style.left = fire.sx + "px"
        span.style.width = span.style.height = "1px"
        span.style.opacity = (100 - i) / 100
        back.appendChild(span)
    }
    if (fires.length < 100 && fires.length > 0) {
        fire = fires[0]
        fires.unshift({
            sx: fire.sx + fire.vx,
            sy: fire.sy + fire.vy,
            vx: fire.vx,
            vy: fire.vy
        })
    }
    else {
        fires = []
    }
    if (fires.length == 0 && Math.random() < 0.05) {
        fires.push({
            sx: Math.random() * back.clientWidth,
            sy: Math.random() * back.clientHeight,
            vx: Math.random() + 2,
            vy: Math.random() + 2
        })
    }

}
setInterval(draw, 10);