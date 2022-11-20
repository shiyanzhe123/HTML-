var back=document.getElementById("back")
var words=['和平','正义','点赞','投币','关注','学习','收藏']
var worddata=[]
var wordlife = 300
window.addEventListener("click",function(evt){
    var span = document.createElement("span")
    span.className="word"
    back.appendChild(span)
    worddata.push({
        word:words[parseInt(Math.random()*words.length)],
        age : 0,
        sx :evt.x,
        sy : evt.y
    })
})
function draw(){
    for(var i=0;i<worddata.length;i++){
        children=back.children[i]
        word = worddata[i]
        word.age++
        word.sy--
        children.innerHTML=word.word
        children.style.opacity=1-word.age/wordlife
        children.style.left=word.sx+"px"
        children.style.top=word.sy+"px"
        if(word.age >= wordlife){
            worddata.splice(i,1)
            back.removeChild(back.childNodes[i])
        }
    }
}
setInterval(draw,1)