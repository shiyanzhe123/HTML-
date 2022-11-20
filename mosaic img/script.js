var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var img = new Image()
img.src = "building.jpg"
var range = document.getElementById("range")
img.addEventListener("load", function () {
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
            ctx.fillStyle = color
            x = (i % iw) * count
            y = parseInt(i / iw) * count
            ctx.fillRect(x, y, count, count)
            ctx.strokeStyle = "rgba(0,0,0,0.5)"
            ctx.strokeRect(x, y, count, count)
        }
    }
    draw(8)
    range.addEventListener("input", function () {
        draw(range.value)
    })
})