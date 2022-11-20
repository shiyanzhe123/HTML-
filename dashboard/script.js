var main = document.getElementsByClassName("main")[0]
var range = document.getElementById("range")
var pc = document.getElementById("pc")
for (var i = 0; i < 100; i++) {
    var span = document.createElement("span")
    span.style.transform = "rotate(" + i / 100 * 360 + "deg)"
    main.appendChild(span)
}
function dash(val) {
    for (var i = 0; i < main.children.length; i++) {
        var block = main.children[i]
        if (i < val) {
            block.style.setProperty('--bg', 'hsl(' + i / 100 * 360 + ',100%,50%)')
            block.style.setProperty('--sg', 'hsl(' + i / 100 * 360 + ',100%,50%)')
        }
        else {
            block.style.setProperty('--bg', 'black')
            block.style.setProperty('--sg', 'transparent')
        }
    }
}
range.addEventListener("input", function () {
    range.style.backgroundSize = range.value + "% 100%"
    pc.innerHTML = range.value + "%"
    dash(range.value)
})
