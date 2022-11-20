let input = document.querySelectorAll("input[type='password']")
let list = document.querySelectorAll("li")
let button = document.querySelector("button")
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("keyup", () => {
        check()
    })
}
function check() {
    let allcheck = []
    let checks = [
        /[A-Z]/,
        /[a-z]/,
        /\d/,
        /[~`!@#$%^&*(),.<>';":]/,
        /^[\w~`!@#$%^&*(),.<>';":]{10,}$/
    ]
    for (let i in checks) {
        let reg = checks[i]
        if (reg.test(input[0].value)) {
            change(i, true)
            allcheck.push(true)
        }
        else {
            change(i, false)
            allcheck.push(false)
        }
        if (input[0].value == input[1].value && input[0].value.length > 0) {
            change(5, true)
            allcheck.push(true)
        }
        else {
            change(5, false)
            allcheck.push(false)
        }
    }
    let bot = true
    for (let i in allcheck) {
        bot = bot && allcheck[i]
    }
    if (bot) {
        button.style.setProperty("--c", "white")
    }
    else {
        button.style.setProperty("--c", "gray")
    }
}
function change(v, b) {
    if (b) {
        list[v].style.color = "white"
        list[v].children[0].innerHTML = "&#9745"
        list[v].children[0].style.color = "#7bed9f"
    }
    else {
        list[v].style.color = "gray"
        list[v].children[0].innerHTML = "&#9744"
        list[v].children[0].style.removeProperty("color")
    }
}