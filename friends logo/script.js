var words = document.getElementById("text")
var main = document.getElementById("main")
function draw() {
    var str = words.value
    main.innerHTML = ""
    for (var i = 0; i < str.length; i++) {
        var span = document.createElement("span")
        if (i != str.length - 1) {
            span.style.setProperty("--c", color())
        }
        span.innerHTML = str[i]
        main.appendChild(span)
    }
}

function color() {
    var r = parseInt(Math.random() * 255)
    var g = parseInt(Math.random() * 255)
    var b = parseInt(Math.random() * 255)
    return "rgb(" + r + "," + g + "," + b + ")"
}

draw()