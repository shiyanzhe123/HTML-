var body = window.document.body
var back = document.getElementById("back")
var points = []
var frag = document.createDocumentFragment() //建立虚拟节点对象
document.activeElement.addEventListener("keyup", function(evt) { //监听获得焦点的元素keyup事件
    var act = document.activeElement //定义当前获得焦点的元素
    var run = 10 //循环10次
    var shake = setInterval(function() { //震动效果
        run--
        act.style.transform = "translateY(-" + run + "px)" //向上位移后回复原位，模拟震动效果
        if (run < 0) {
            clearInterval(shake)
        }
    })
    fontsize = window.getComputedStyle(act, null).getPropertyValue('font-size').slice(0, -2) //获取字体尺寸
    padding = {
        left: parseInt(window.getComputedStyle(act, null).getPropertyValue('padding-left').slice(0, -2)),//获取左边距尺寸
        top: parseInt(window.getComputedStyle(act, null).getPropertyValue('padding-top').slice(0, -2)) //获取右边距尺寸
    }
    cRect = act.getBoundingClientRect() //获取页面内位置
    sx = cRect.left + padding.left //计算文字左上角坐标
    sy = cRect.top + padding.top
    var span = document.createElement("span") //创建span对象
    span.innerHTML = act.value //将输入框内容写入span对象
    body.appendChild(span) //添加子元素
    if (span.clientWidth < act.clientWidth) { //取值范围不超过输入框宽度
        var size = span.clientWidth
    } else {
        var size = act.clientWidth
    }
    body.removeChild(span) //移除用于计算文字宽度的span对象
    if (act.value.length > 0) { //输入框内容不为空的话插入50个粒子
        for (var i = 0; i < 50; i++) {
            points.push({
                //粒子生成范围为文字覆盖范围，宽度尺寸大致取文字尺寸的1/2
                sx: Math.random() * (fontsize / 2) + size + sx - fontsize / 2, 
                sy: Math.random() * fontsize + sy,
                vx: (0.5 - Math.random()) * 2,//水平移动方向随机
                vy: -Math.random(),//垂直移动方向初始化为向上
                age: parseInt(Math.random() * 50),//随机设置生命值
                color: parseInt(Math.random() * 360) //随机生成色相值
            })
        }
    }
})

function draw() {
    back.innerHTML = "" //清空背景内容
    frag.innerHTML = "" //清空虚拟节点内容
    for (var i = 0; i < points.length; i++) {
        point = points[i]
        var span = document.createElement("span")
        //根据粒子属性设置span样式
        span.style.left = point.sx + "px"
        span.style.top = point.sy + "px"
        span.style.width = span.style.height = "4px" //设置粒子尺寸默认为4px
        span.style.background = "hsl(" + point.color + ",100%,50%)" //饱和度为100%，亮度为50%
        span.style.opacity = (200 - point.age) / 200 //透明度按生命值递增
        frag.appendChild(span) //每次循环插入虚拟节点
        point.sx += point.vx //位置计算
        point.sy += point.vy
        point.vy += 0.01 //垂直加速度方向缓慢改变至向下
        point.age++
            if (point.age > 200 || points.length > 500) { //当粒子生命值超过200或粒子总数超过500时删除此粒子
                points.splice(i, 1)
            }
    }
    back.appendChild(frag) //将虚拟节点的内容插入背景
}
setInterval(draw, 10)