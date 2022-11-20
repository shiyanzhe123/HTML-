// 26104 × 728
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var card = document.createElement("canvas")
var img = new Image()
img.src = "deck.png"
var cctx = card.getContext("2d")
var start = 0

img.addEventListener("load", function () {
    card.width = 251
    card.height = 364
    cctx.drawImage(img, 0, 0, 502, 728, 0, 0, card.width, card.height)
    var vx, vy, sx, sy, vel
    function init() {
        vx = Math.random() * 5 + 2
        vy = Math.random() * 15 + 5
        sx = 0
        sy = 0
        vel = vy
    }
    init()
    function fall() {
        ctx.drawImage(card, sx, sy)
        sx += vx
        sy += vy
        vy += 0.1
        vx += 0.01
        if (sy > (canvas.height - card.height)) {
            vel = vel * 0.9
            vy = -vel
        }
        if (sx > canvas.width) {
            start++
            init()
            cctx.clearRect(0, 0, card.width, card.height)
            cctx.drawImage(img, start % 52 * 502, 0, 502, 728, 0, 0, card.width, card.height)
        }
    }
    setInterval(fall, 10)
})