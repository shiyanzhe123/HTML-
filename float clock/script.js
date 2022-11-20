let canvas = document.createElement("canvas")
canvas.width = 200
canvas.height = 80
canvas.style.position = "fixed"
canvas.style.right = "10px"
canvas.style.top = "10px"
let ctx = canvas.getContext("2d")
let wd = ['日', '一', '二', '三', '四', '五', '六']
document.body.appendChild(canvas)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let d = new Date()
    let timenow = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2)
    let datenow = d.getFullYear() + "年" + (" " + (d.getMonth() + 1)).slice(-2) + "月" + (" " + d.getDate()).slice(-2) + "日"
    let wnow = wd[d.getDay()]

    ctx.fillStyle = "gray"
    ctx.font = "30px Pix Font"
    ctx.fillText(timenow, 12, 32)
    ctx.font = "18px Pix Font"
    ctx.fillText(datenow, 12, 62)
    ctx.font = "40px Pix Font"
    ctx.fillText(wnow, 152, 52)

    ctx.fillStyle = "black"
    ctx.font = "30px Pix Font"
    ctx.fillText(timenow, 10, 30)
    ctx.font = "18px Pix Font"
    ctx.fillText(datenow, 10, 60)
    ctx.font = "40px Pix Font"
    ctx.fillText(wnow, 150, 50)

}
setInterval(draw, 100)