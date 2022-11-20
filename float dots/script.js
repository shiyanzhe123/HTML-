// 使用虚拟节点方式可以极大的提高页面渲染速度，有兴趣的可以去掉注释比较一下
var back = document.getElementsByClassName("back")[0]
var dots = []
var width = back.clientWidth
var height = back.clientHeight
// var frag = document.createDocumentFragment() //创建虚拟节点

function draw() {
    back.innerHTML = "" //清空div.back
    // frag.innerHTML = "" //清空虚拟节点
    for (var i = 0; i < dots.length; i++) { //遍历dots数组并根据对象属性创建对应的 span
        var dot = dots[i]
        var span = document.createElement("span")
        span.style.width = span.style.height = dot.size + "px"
        span.style.left = dot.sx + "px"
        span.style.top = dot.sy + "px"
        // 使用hsl方式设置背景颜色，便于直接更改对比度
        span.style.backgroundColor = "hsl(" + dot.color + ",100%," + (100 - (dot.rota % 180) / 180 * 100) + "%)" 
        span.style.perspective = "100" //拉开观察距离，体现3D效果
        span.style.transform = "rotateZ(" + dot.deg + "deg) rotateX(" + dot.rota + "deg)" //旋转并翻转对象
            back.appendChild(span) //将span插入背景
        // frag.appendChild(span) //将span 插入虚拟节点
        dot.sy += dot.vy
        dot.rota += dot.vy
        if (dot.sy > height) {
            dots.splice(i, 1)
        }
    }
    if (dots.length < 1000) {
        seed = Math.random()
        dots.push({
            sx: parseInt(Math.random() * width),
            sy: 0,
            size: parseInt(seed * 10 + 10),
            vy: parseInt(seed * 5 + 2),
            deg: parseInt(seed * 180),
            rota: parseInt(seed * 90),
            color: parseInt(seed * 360),
        })
    }
    // back.appendChild(frag) //一次性将虚拟节点的对象插入背景层 
}
setInterval(draw, 10)