var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
window.document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.setAttribute('style', 'position:fixed;left:0;top:0;pointer-events:none;z-index:-1;')
var hexArray = []
var radius = 10
var mouse = {
    x: -200,
    y: -200
}
window.addEventListener("mousemove", function(evt) {
    mouse.x = evt.x
    mouse.y = evt.y
})
class hex {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.radius = r
        this.life = 200
        this.age = 0
    }
    update() {
        if (this.age > 0) {
            this.age --
        }
    }
    draw() {
        ctx.strokeStyle = "rgba(52,152,219," + this.age / this.life + ")"
        ctx.beginPath()
        ctx.moveTo(this.x - this.radius, this.y + Math.sqrt(0.75 * Math.pow(this.radius * 2, 2)))
        ctx.lineTo(this.x + this.radius, this.y + Math.sqrt(0.75 * Math.pow(this.radius * 2, 2)))
        ctx.lineTo(this.x + this.radius * 2, this.y)
        ctx.lineTo(this.x + this.radius, this.y - Math.sqrt(0.75 * Math.pow(this.radius * 2, 2)))
        ctx.lineTo(this.x - this.radius, this.y - Math.sqrt(0.75 * Math.pow(this.radius * 2, 2)))
        ctx.lineTo(this.x - this.radius * 2, this.y)
        ctx.closePath()
        ctx.stroke()
    }
}

function init() {
    for (var i = 0; i < canvas.width / radius * 6 + 1; i++) {
        for (var j = 0; j < canvas.height / Math.sqrt(0.75 * Math.pow((radius + 1) * 2, 2)) + 1; j++) {
            x = i * ((radius + 1) * 2) * 3
            y = j * Math.sqrt(0.75 * Math.pow((radius + 1) * 2, 2))
            if (j % 2 == 0) {
                x = i * (radius + 1) * 6 + (radius + 1) * 3
            }
            hexArray.push(new hex(x, y, radius))
        }
    }

}
init()

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < hexArray.length; i++) {
        var hex = hexArray[i]
        var range = Math.sqrt(Math.pow(hex.x - mouse.x, 2) + Math.pow(hex.y - mouse.y, 2))
        if (Math.sqrt(Math.pow(hex.x - mouse.x, 2) + Math.pow(hex.y - mouse.y, 2)) < 80) {
            hex.age = hex.life - range
        
        
        
        // hex.draw()
        }
        if(hex.age>0){
            hex.update()
            hex.draw()
        }
    }
    
        hexArray[(Math.random() * hexArray.length) | 0].age = 500
    
}
setInterval(animation, 10)