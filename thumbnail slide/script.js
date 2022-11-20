let imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"]
let show = document.querySelector(".show")
let img = document.querySelector(".imgs")
let left = document.querySelector(".left")
let right = document.querySelector(".right")
let imgleft = 0
function init() {
    for (let i in imgs) {
        let span = document.createElement("span")
        span.style.background = "url('" + imgs[i] + "')"
        span.style.left = i * 100 + "px"
        span.style.backgroundSize = "cover"
        span.style.backgroundPosition = "center center"
        img.appendChild(span)
    }
    show.style.background = "url('" + imgs[0] + "')"
    show.style.backgroundSize = "cover"
    show.style.backgroundPosition = "center center"
}
init()
left.addEventListener("click", function () {
    if (imgleft > (5 - imgs.length) * 100) {
        imgleft -= 100
        img.style.left = imgleft + "px"
    }

})
right.addEventListener("click", function () {
    if (imgleft < 0) {
        imgleft += 100
        img.style.left = imgleft + "px"
    }
})

for (let i = 0; i < img.childElementCount; i++) {
    let c = img.children[i]
    c.addEventListener("click", function () {
        show.style.background = "url('" + imgs[i] + "')"
        show.style.backgroundSize = "cover"
        show.style.backgroundPosition = "center center"
    })
}
img.addEventListener("wheel", function (evt) {

    if (evt.deltaY > 0 && imgleft < 0) {
        imgleft += 100
        console.log(imgleft)
    }
    if (evt.deltaY < 0 && imgleft > (5 - imgs.length) * 100) {
        imgleft -= 100
    }
    img.style.left = imgleft + "px"
})