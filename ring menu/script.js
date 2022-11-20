var items = document.getElementsByTagName("span")
var icons = document.getElementsByTagName("i")
var deg = 0
var li = 0
var link = document.getElementById("link")
var menu = document.getElementsByClassName("menu")[0]
var links = [
    { url: "#linux", str: "LINUX" },
    { url: "#ubuntu", str: "UBUNTU" },
    { url: "#suse", str: "SUSE" },
    { url: "#redhat", str: "REDHAT" },
    { url: "#fedora", str: "FEDORA" },
    { url: "#centos", str: "CENTOS" }
]
function init() {
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        var icon = icons[i]
        item.style.transform = "rotate(" + (i * 60 + deg) + "deg)"
        icon.style.transform = "rotate(" + (-i * 60 - deg) + "deg)"
        item.style.color = "black"
        item.style.filter = "blur(3px)"
    }
    link.setAttribute("href", links[li].url)
    link.textContent = links[li].str
    var color = "hsl(" + li * 60 + "deg,80%,50%)"
    link.style.textShadow = "0 0 5px " + color + ",0 0 10px " + color
    items[li].style.color = color
    items[li].style.filter = "blur(0px)"
}
menu.addEventListener("wheel", function (evt) {
    if (evt.deltaY > 0) {
        deg += 60
        li--
    }
    else {
        deg -= 60
        li++
    }
    li = (li + 6) % 6
    init()
})
init()