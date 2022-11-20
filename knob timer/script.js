var knob = document.getElementsByClassName("knob")[0]
var roll = 0
knob.addEventListener("wheel", function(evt) {
    if (evt.deltaY < 0) {
        roll += 360 / 100
    } else {
        roll -= 360 / 100
    }
    roll = (roll + 360) % 360
    setTime(roll)
})
knob.addEventListener("click", function() {
    var count = setInterval(function() {
        roll -= 360 / 100
        if (roll < 0) {
            clearInterval(count)
            roll = 0
        } else {
            setTime(roll)
        }
    }, 1000)
})

function setTime(v) {
    knob.style.transform = "rotate(" + v + "deg)"
    knob.setAttribute('data-text', v / 360 * 100 | 0)
    knob.style.setProperty('--r', -v + "deg")
}