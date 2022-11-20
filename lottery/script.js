let nlist = document.querySelector(".list")
let fn = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈']
let sn = ['泽', '梓', '子', '宇', '沐', '一', '宸', '涵', '辰', '奕']
let names = []
let run = false
function init() {
    for (let i = 0; i < 40; i++) {
        names.push(fn[Math.random() * fn.length | 0] + sn[Math.random() * sn.length | 0] + sn[Math.random() * sn.length | 0])
    }
}
init()
for (var i in names) {
    let span = document.createElement("span")
    span.innerText = names[i]
    nlist.appendChild(span)
}

let spans = nlist.children
let deg = 0
let slow = 0
document.addEventListener("keyup", function (evt) {
    if (evt.key == " ") {
        run = !run
    }
})
function draw() {
    for (var i = 0; i < spans.length; i++) {
        let span = spans[i]
        span.style.transform = "rotate(" + (i / names.length * 360 + deg) + "deg)"
        span.style.color = "white"
    }
    let now = ((360 - deg) / 360 * names.length | 0) % names.length
    nlist.setAttribute('data', names[now])
    spans[now].style.color = "red"
    if (run) {
        slow = 1
    }
    else {
        slow = slow * 0.995
    }
    deg -= slow
}
setInterval(draw, 10)