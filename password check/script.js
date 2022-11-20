var check = document.getElementById("check")
var user = document.getElementById("user")
var pass = document.getElementById("pass")
var repass = document.getElementById("repass")
var inputs = document.getElementsByTagName("input")
var regbutton = document.getElementsByTagName("button")[0]
var colors = [
    "#ff4757",
    "#ffa502",
    "#2ed573",
    "#1e90ff"
]

function checksame() {
    if (pass.value == repass.value && pass.value.length > 0) {
        pass.style.border = repass.style.border = "1px solid #7bed9f"
        return true
    } else if (pass.value != repass.value && pass.value.length > 0) {
        pass.style.border = repass.style.border = "1px solid #ff6b81"
        return false
    } else {
        pass.style.border = repass.style.border = "1px solid white"
        return false
    }
}

function checkpass(val) {
    var sl = 0

    // var c1 = /[a-z]/
    // var c2 = /[0-9]/
    // var c3 = /[A-Z]/
    // var c4 = /[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/
    // if (c1.test(val)) {
    //     sl++
    // }
    // if (c2.test(val)) {
    //     sl++
    // }
    // if (c3.test(val)) {
    //     sl++
    // }
    // if (c4.test(val)) {
    //     sl++
    // }
    var chk = [
        /[a-z]/,
        /[0-9]/,
        /[A-Z]/,
        /[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/
    ]
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].test(val)) {
            sl++
        }
    }

    return (sl)
}
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function() {
        var level = checkpass(pass.value)
        for (var i = 0; i < 4; i++) {
            if (i < level) {
                check.children[i].style.background = colors[i]
            } else {
                check.children[i].style.background = "black"
            }
        }
        if (checksame() && pass.value.length > 7 && level > 2 && user.value.length > 0) {
            regbutton.style.color = "white"
            regbutton.style.border = "1px solid white"
            regbutton.style.cursor = "pointer"
        } else {
            regbutton.style.color = "gray"
            regbutton.style.border = "1px solid gray"
            regbutton.style.cursor = "default"
        }
    })
}