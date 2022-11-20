var back = document.getElementsByClassName("back")[0]
document.addEventListener("mousemove", function(evt) {
    var x = window.innerWidth / 2 - evt.x
    var y = window.innerHeight / 2 - evt.y
    x = -x / (window.innerWidth / 2) * 5
    y = -y / (window.innerHeight / 2) * 5
    back.style.setProperty('--x', y + "deg")
    back.style.setProperty('--y', x + 'deg')
})