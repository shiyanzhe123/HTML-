// 备选菜单列表，中间用空格间隔
var foods = "牛肉拉面 土豆烧牛肉拌面 土豆烧牛肉盖饭 扬州炒饭 宫保鸡丁盖饭 大盘鸡盖饭 拉条子 炒片 牛肉炒饭 麻婆豆腐盖饭 炸鸡 烤串 汉堡 披萨 海鲜炒饭 炒烤肉盖饭 轻食沙拉 广式叉烧饭 煲仔饭 鸡公煲 重庆小面 黄焖鸡米饭 褡裢火烧 包子 炒肝 春饼"
var food = foods.split(" ") //通过空格拆分为数组
var main = document.getElementsByClassName("main")[0] //菜单备选区域
main.innerHTML = "今天中午吃点啥" //默认提示
var start = document.getElementById("start") //启停开关
var back = document.getElementsByClassName("back")[0] //背景动画
var stop = true //默认为停止
var texts = [] //背景文本数组
var colors = [ //备选颜色
    "#eccc68",
    "#ffa502",
    "#7bed9f",
    "#a4b0be",
    "#70a1ff",
    "#ff6b81"
]
function draw() { //动画刷新
    back.innerHTML = "" // 清空背景文本
    if (!stop) { //启动状态刷新显示文字
        main.innerHTML = food[parseInt(Math.random() * food.length)]
        start.innerHTML = "就吃它了"
    }
    else { //停止状态文字不刷新
        start.innerHTML = "中午吃点啥"
    }
    for (var i = 0; i < texts.length; i++) { //根据背景文字数组绘制元素
        text = texts[i]
        var span = document.createElement("span")
        span.style.position = "absolute"
        span.style.top = text.sy + "px"
        span.style.left = text.sx + "px"
        span.style.color = text.color
        span.style.fontSize = text.size + "px"
        span.style.opacity = 1 - text.age / 100 //渐变透明度
        if (stop) {
            span.innerHTML = main.innerHTML //停止状态则显示备选框文字
        }
        else { //运行状态则显示菜单内容
            span.innerHTML = text.str
        }
        back.appendChild(span) //添加进背景
        text.sy += text.vy //位移
        text.age++ //增加生命值
        if (text.age > 100) { //大于100则从数组中删除
            texts.splice(i, 1)
        }
    }
    if (texts.length < 50) { //背景文字数量少于50则插入新背景文字
        texts.push({
            str: food[parseInt(Math.random() * food.length)], //随机选择菜名
            sx: Math.random() * window.innerWidth, //随机起始位置
            sy: Math.random() * window.innerHeight,
            vy: -Math.random(), //随机位移速度
            color: colors[parseInt(Math.random() * colors.length)], //随机选择颜色
            size: Math.random() * 20 + 20, //文字尺寸范围为20-40
            age: Math.random() * 20 //起始生命值为0-20
        })
    }
}
setInterval(draw, 10); //10毫秒刷新