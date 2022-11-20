var main = document.getElementById("main")

for (var i = 0; i < 40; i++) {
    var span = document.createElement("span")
    span.style.width = span.style.height = (40-i) * 15 + "px"
        // span.style.animation = "cir 8s " + 0.05 * i + "s infinite"
    span.style.transform = "rotate(" + i /60  * (-360) + "deg) "
    span.style.borderRadius = i + "%"
    span.style.boxShadow="0 0 "+10+"px hsl(" + i / 40 * 360 + ",100%,50%)"
        span.style.opacity = i / 40
        // span.style.filter = "blur(" + (40 - i) / 10 + "px)"
    // span.style.borderColor = "hsl(" + i / 40 * 360 + ",100%,50%)"
        span.style.background = "hsl(" + i / 40 * 360 + ",100%,50%)"
    main.appendChild(span)
}