## 过程整理
1. 按顺序发光
    实现方式:CSS变量
2. infinity 排列
    实现方式:
        并排两个div，通过旋转div内的span元素制作圆形发光点
3. 快速输入重复内容
```
    span[style="--r:$"]*n
```
4. 计算延迟
    按照每个点1/4循环过渡发光，1/4循环过渡变暗，1/2循环不发光，总循环数乘以总点数为动画总时间