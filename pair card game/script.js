var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")
canvasStyle = window.getComputedStyle(canvas, null)
canvas.width = canvas.height = 800
var cards = [] //卡片数组
var pair = [] //配对数组
var save = [] //翻开卡片的索引
function newgame() {
    var rnd = [] //空数组用于填充卡面
    for (var i = 0; i < 100; i++) {
        rnd.push(i % 10) //分别填入0~9各10个值
    }
    var idx = 0 //索引
    cards = [] //清空卡片数组
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            idx = parseInt(Math.random() * rnd.length) //获取随机索引值
            cards.push({
                value: rnd[idx], //写入卡片值
                turn: false, //标记卡片为未翻开
                x: i, //写入卡片横坐标
                y: j //写入卡片纵坐标
            })
            rnd.splice(idx, 1) //删掉已经写入卡面的索引对应的数字
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) //清空画布
    ctx.font = "60px sans-serif" //设定文字属性
    for (var i = 0; i < cards.length; i++) { //遍历卡片数组
        card = cards[i]
        ctx.fillStyle = "white" //默认填充白色
        if (!card.turn) { //如卡片为翻开状态，则填充为黑色
            ctx.fillStyle = "black"
        }
        ctx.fillRect(80 * card.x + 1, 80 * card.y + 1, 78, 78) //绘制卡片
        ctx.fillStyle = "black" //填充文字为黑色
        ctx.fillText(card.value, 80 * card.x + 21, 80 * card.y + 61) //将文字值写入卡片位置
    }
}

canvas.addEventListener("click", function (evt) { //获取点击事件
    var cRect = canvas.getBoundingClientRect() 
    var canvasX = Math.round(evt.clientX - cRect.left)
    var canvasY = Math.round(evt.clientY - cRect.top)
    var x = parseInt(canvasX / 80)
    var y = parseInt(canvasY / 80)
    var origin = x * 10 + y //根据点击位置计算卡片索引
    if (!cards[origin].turn){ //如果卡片状态为未翻开状态
        cards[origin].turn = !cards[origin].turn //切换索引卡片翻转状态
        pair.push(cards[origin].value) //将翻开的卡片值写入pair数组
        save.push(origin) //将翻开的卡片索引写入save 数组
    if (pair.length >= 2) { //当翻开两张时
        if (pair[0] != pair[1]){ //判断两张卡片值是否相等
            setTimeout(function(){ //如不相等，延迟0.5秒后将翻开的卡片翻转回未翻开状态
                for (var i=0;i<save.length;i++){
                    cards[save[i]].turn = !cards[save[i]].turn
                }
                save=[] //清空save及pair
                pair=[]
            },500)
        }
        else{ //如两张卡片值相等，则保持翻转状态，仅清空save及pair数组
            save=[]
            pair=[]
        }
    }
    }
    
})
newgame()
setInterval(draw, 1)