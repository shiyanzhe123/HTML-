var str = "先帝创业未半，而中道崩殂；今天下三分，益州疲弊，此诚危急存亡之秋也！然侍卫之臣，不懈于内；忠志之士，忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气﹔不宜妄自菲薄，引喻失义，以塞忠谏之路也。宫中、府中，俱为一体；陟罚臧否，不宜异同。若有作奸、犯科，及为忠善者，宜付有司，论其刑赏，以昭陛下平明之治；不宜偏私，使内外异法也。侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰「能」，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。亲贤臣，远小人，此先汉所以兴隆也﹔亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也！侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之、信之，则汉室之隆，可计日而待也。"
var words = str.split("")
var main = document.getElementsByClassName("main")[0]

function write() {
    if (words.length > 0) {
        var span = document.createElement("span")
        var dele = words.shift()
        var opc = 0
        span.innerHTML = dele
        main.appendChild(span)
        var fade = setInterval(function() {
            opc++
            span.style.opacity = opc / 10
            span.style.color = "transparent"
            span.style.textShadow = "0 0 5px #57606f,0 0 10px #57606f,0 0 4px #57606f,0 0 12px #ffa502"
            span.style.filter = "blur(" + (10 / opc - 1) + "px)"
            if (opc >= 10) {
                clearInterval(fade)
                span.style.color = "#2f3542"
            }
        }, 50)
    }
}
setInterval(write, 50)