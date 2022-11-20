var mains = document.getElementsByClassName("main")
window.addEventListener("mousemove", function (evt) {
    for (var i = 0; i < mains.length; i++) {
        main = mains[i]
        var ex = evt.x - main.offsetLeft - main.clientWidth / 2
        var ey = evt.y - main.offsetTop - main.clientHeight / 2
        var deg = 360 * Math.atan(ey / ex) / (2 * Math.PI)
        if (ex < 0) {
            deg += 180
        }
        main.style.transform = "rotate(" + deg + "deg)"
    }
})