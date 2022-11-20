var banner = document.getElementById("banstr")
var w = banner.offsetWidth
var h = banner.offsetHeight
if (w < 260) {
    banner.style.width = "260px"
    w = banner.offsetWidth
}
var l = w - Math.sqrt(Math.pow(w, 2) / 2)
banner.style.top = "-" + h + "px"
banner.style.right = "-" + l + "px"