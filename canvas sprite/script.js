var back = document.getElementById("back") //背景画布
back.width = window.innerWidth
back.height = window.innerHeight
var bctx = back.getContext("2d")

var sprite = document.createElement("canvas") //角色画布
var ctx = sprite.getContext("2d")
sprite.width = 139
sprite.height = 119

var img = new Image() //图片
img.src = "run.png"
var frame = 0
var face = true
var position = {
    x: back.width / 2,
    y: back.height / 2
}
var vect = {
    x: 0,
    y: 0
}


img.addEventListener("load", function() {
    function turn() {
        ctx.translate(sprite.width, 0)
        ctx.scale(-1, 1)
    }

    function draw() {
        if (vect.x != 0 || vect.y != 0) {
            frame++
            ctx.clearRect(0, 0, sprite.width, sprite.height)
            ctx.drawImage(img, frame * 544, 0, 544, 476, 0, 0, 136, 119)
            if (frame == 7) {
                frame = 0
            }
        } else {
            ctx.clearRect(0, 0, sprite.width, sprite.height)
            ctx.drawImage(img, 0, 0, 544, 476, 0, 0, 136, 119)
        }
        bctx.clearRect(0, 0, back.width, back.height)
        bctx.drawImage(sprite, position.x, position.y)
        position.x += vect.x
        position.y += vect.y

    }
    setInterval(draw, 80)
    window.addEventListener("keydown", function(evt) {
        if (evt.key == "ArrowLeft") {
            vect.x = -8
            if (face) {
                turn()
                face = false
            }
        }
        if (evt.key == "ArrowRight") {
            vect.x = 8
            if (!face) {
                turn()
                face = true
            }
        }
        if (evt.key == "ArrowUp") {
            vect.y = -8
        }
        if (evt.key == "ArrowDown") {
            vect.y = 8
        }
    })
    window.addEventListener("keyup", function() {
        vect.x = vect.y = 0
    })
})