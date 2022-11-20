var main = document.getElementsByClassName("main")[0]
document.addEventListener("mousemove", function(evt) {
    var x = window.innerWidth / 2 - evt.x
    var y = window.innerHeight / 2 - evt.y
    x = -x / (window.innerWidth / 2) * 30
    y = -y / (window.innerHeight / 2) * 30
    main.style.setProperty('--x', y + "deg")
    main.style.setProperty('--y', x + "deg")
    main.style.background = "radial-gradient(circle at " + (-x + 30) * 1.6 + "% " + (-y + 30) * 1.6 + "%,white,lightblue)"
})