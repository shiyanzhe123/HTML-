var blocks = [...document.querySelectorAll(".main > div")]
for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.setProperty('--c',
        "hsl(" + i / 9 * 360 + ",50%,50%)"
    )
}
var back = document.getElementById("back")
window.addEventListener("mousemove", function (ev) {
    var x = ev.clientX
    var y = ev.clientY
    if (this.document.elementFromPoint(x, y).className == "block") {
        evt = document.elementFromPoint(x, y)
        back.style.top = evt.offsetTop + "px"
        back.style.left = evt.offsetLeft + "px"
        back.style.background = this.getComputedStyle(evt).getPropertyValue('--c')
    }

})