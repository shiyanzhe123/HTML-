let canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.background = "rgba(0,0,0,0.1)"
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.zIndex = "999"
canvas.style.pointerEvents = "none"
let ctx = canvas.getContext("2d")
ctx.lineWidth = 3
ctx.lineCap = 'round'


let tails = []
document.addEventListener("mousemove", function(evt) {
    tails.push({
        x: evt.x,
        y: evt.y
    })
    if (tails.length > 100) {
        tails.splice(0, 1)
    }
})

function ani() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < tails.length - 1; i++) {
        let t = tails[i]
        let t1 = tails[i + 1]
        ctx.beginPath()
        ctx.lineTo(t.x, t.y)
        ctx.lineTo(t1.x, t1.y)
        ctx.strokeStyle = "hsl(" + i / tails.length * 360 + ",80%,50%)"
        ctx.stroke()


    }


    tails.splice(0, 1)
}
setInterval(ani, 100 / 6)