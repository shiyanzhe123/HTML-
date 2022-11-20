let slide = document.querySelector(".slide")
let width = slide.clientWidth
let height = slide.clientHeight
let imgs = slide.children
let imgurls = []
for (var i = 0; i < imgs.length; i++) {
    imgurls.push(imgs[i].src)
}
let pos = 0
slide.innerHTML = ""
let imgdiv = document.createElement("div")
imgdiv.style.width = width * imgurls.length + "px"
imgdiv.style.height = height + "px"
imgdiv.style.position = "absolute"
imgdiv.style.left = "0"
imgdiv.style.transitionDuration = "2s"
let spans = []
for (i in imgurls) {
    var back = document.createElement("div")
    back.style.width = width + "px"
    back.style.height = height + "px"
    back.style.float = "left"
    back.style.background = "url('" + imgurls[i] + "')"
    back.style.backgroundSize = "cover"
    imgdiv.appendChild(back)

    var span = document.createElement("span")
    span.style.position = "absolute"
    span.style.left = 30 * i + 40 + "px"
    span.style.bottom = "40px"
    span.style.width = "15px"
    span.style.height = "15px"
    span.style.border = "3px solid white"
    span.style.zIndex = "9"
    span.style.background = "rgba(0,0,0,0.1)"
    slide.appendChild(span)
    spans.push(span)
    spans[i].index = i
    spans[i].addEventListener("click", function () {
        move(this.index)
        pos = this.index
        clearInterval(auto)
    })
    spans[i].addEventListener("mouseenter", function () {
        clearInterval(auto)
    })
}
slide.appendChild(imgdiv)

function move(val) {
    for (i in spans) {
        var s = spans[i]
        s.style.background = "rgba(0,0,0,0.1)"
        if (i == val) {
            s.style.background = "rgba(0,0,255,0.6)"
        }
    }
    var left = -val * width
    imgdiv.style.left = left + "px"
}
move(0)
function autochange() {
    pos++
    if (pos >= imgs.length - 1) {
        pos = 0
    }
    move(pos)
}
let auto = setInterval(autochange, 3000);
imgdiv.addEventListener("mouseenter", function () {
    clearInterval(auto)
})
imgdiv.addEventListener("mouseout", function () {
    auto = setInterval(autochange, 3000);
})