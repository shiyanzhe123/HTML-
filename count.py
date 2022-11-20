#-*- coding:utf-8 -*-
import requests #用于获取网页数据
import time
import json
from win10toast import ToastNotifier  #支持win10的系统通知包
toaster = ToastNotifier()


count = 0 
newcount = 0
follow = 0
newfollow = 0
upid = "23455820" #up主uid 

while True:
    videosurl = "http://api.bilibili.com/x/space/arc/search?mid="+upid+"&ps=100" #获取视频数据地址
    userinfo = "https://api.bilibili.com/x/relation/stat?vmid="+upid+"&jsonp=jsonp" #获取up主信息地址
    try:
        ret = requests.get(videosurl) #访问B站提供的API地址
        datas = json.loads(ret.text) #json字符串转python对象
        allpost = datas['data']['list']['vlist'] #视频数组
        pages = datas['data']['page']['count'] // 100 #页面数量
        if pages > 0:
            for i in range(pages): #循环获取超过100个视频的信息并添加进数组
                url = "http://api.bilibili.com/x/space/arc/search?mid="+upid+"&ps=100&pn="+str(i+2)
                ret = requests.get(url)
                datas = json.loads(ret.text)
                allpost = allpost + datas['data']['list']['vlist']
        count = 0
        for x in allpost: #累计播放量
            count = count + x['play']
        if newcount != count: #有变化则各种方式提醒
            print("播放数量:",count,time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())) #命令行输出
            toaster.show_toast("有新的播放了！", #通知提醒
                    "目前播放量为："+str(count),
                    icon_path="bilibili.ico",
                    duration=5,
                    threaded=True)
            newcount = count #刷新计数器
        time.sleep(30) #30秒延迟
        ret = requests.get(userinfo) #继续获取up主信息
        datas = json.loads(ret.text)
        follow = datas['data']['follower']
        if newfollow != follow:
            print("关注数量:",follow,time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
            toaster.show_toast("有新的关注了！",
                    "目前关注人数："+str(follow),
                    icon_path="bilibili.ico",
                    duration=5,
                    threaded=True)
            newfollow = follow
    except: #如出现错误则延迟60秒后重试
        time.sleep(60)
    time.sleep(30) #循环完成后延迟30秒重试
