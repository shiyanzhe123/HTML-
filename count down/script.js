let endtime = "2022-8-23 19:00:00"
let date = new Date(endtime)
let h1 = document.querySelector(".count")
let daycount = 1000 * 60 * 60 * 24
let hourcount = daycount / 24
let mincount = hourcount / 60
let seccount = mincount / 60

function show() {
    let now = new Date()
    let count = date.getTime() - now.getTime()
    let tips = ""
    if (count >= 0) {
        tips = "距活动开始"
    }
    else {
        tips = "活动已开始"
        count = Math.abs(count)
    }
    h1.setAttribute("data-text", tips)
    let days = count / daycount | 0
    let hours = count % daycount / hourcount | 0
    let minutes = count % hourcount / mincount | 0
    let seconds = count % mincount / seccount | 0

    h1.innerHTML = up2two(days) + "日 " + up2two(hours) + "小时 " + up2two(minutes) + "分钟 " + up2two(seconds) + "秒"
}
function up2two(val) {
    return ("0" + val).slice(-2)
}
setInterval(show, 1000)