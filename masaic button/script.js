var backs = document.getElementsByClassName("back")
for (var i = 0; i < backs.length; i++) {
    var back = backs[i]
    var width = height = back.clientWidth / 20
    var count = 20 * parseInt(back.clientHeight / height)
    for (var j = 0; j < count; j++) {
        var span = document.createElement("span")
        span.style.width = width + "px"
        span.style.height = height + "px"
        span.style.transition = "0.2s linear " + Math.random() * 0.5 + "s"
        back.appendChild(span)
    }
}