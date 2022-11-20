var ol = document.getElementById("allnote") //获取有序列表对象
var lists = ol.children //获取有序列表对象的所有子元素
var newlist = document.getElementsByClassName("new")[0] //获取输入框对象
newlist.addEventListener("keyup", function(evt) { //监听按键事件
    if (evt.key == "Enter") {  //回车键作为判断条件
        if (newlist.value.length > 0) { //判断输入框的值是否有内容
            var li = document.createElement("li") //新建列表项
            li.innerHTML = newlist.value + "<span onclick='remove(" + lists.length + ")'>[x]</span>" //添加输入框内容及span元素作为删除按键
            ol.appendChild(li) //添加进有序列表作为子元素
            newlist.value = "" //清空输入框
        }
    }
})

function remove(val) { //删除记录函数
    lists[val].setAttribute("class", "del") //将选定行添加删除类用于开始删除动效
    setTimeout(function() { //设置延迟0.3秒执行删除操作
        ol.removeChild(lists[val]) //删除子元素
        for (var i = 0; i < lists.length; i++) { //重新遍历子元素
            list = lists[i]
            var span = list.lastChild //获取span对象
            span.setAttribute("onclick", "remove(" + i + ")") //根据新的索引重新绑定删除函数
        }
    }, 300)

}