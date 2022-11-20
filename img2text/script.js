var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var img = new Image()
img.src = "R-C.jpg"
var range = document.getElementById("range")
var str = ".:-+;!co*CO$#&@M"
img.addEventListener("load", function() {
    function draw(count) {
        var iw = parseInt(img.width / count)
        var ih = parseInt(img.height / count)
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, iw, ih)
        var image = new Image()
        image = ctx.getImageData(0, 0, iw, ih)
        canvas.width = iw * count
        canvas.height = ih * count
        for (var i = 0; i < image.data.length / 4; i++) {
            red = image.data[i * 4]
            green = image.data[i * 4 + 1]
            blue = image.data[i * 4 + 2]
            color = "rgb(" + red + "," + green + "," + blue + ")"
            light = 0.3 * red + 0.59 * green + 0.11 * blue
            ctx.fillStyle = "white"
            x = (i % iw) * count
            t = str[(light + 1) / 16 | 0]
            y = parseInt(i / iw) * count
            ctx.font = count + "px sans-serif"
            ctx.fillText(t, x, y)
        }
    }
    draw(10)
    range.addEventListener("input", function() {
        draw(range.value)
    })
})