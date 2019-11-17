# 整体课程  
## 小程序    
### 小程序项目目录结构  
pages目录  
    index.js 控制页面逻辑   
    index.json 页面配置文件  
    index.wxml 模板文件  
    index.wxss 样式文件   
app.json 小程序全局配置文件  
    pages  
    window  
    tabBar   
```
{
    "pages":[
        "pages/home/home",
        "pages/me/me"
    ],
    "window":{
        "backgroundTextStyle":"light",
        "navigationBarBackgroundColor":"#fff",
        "navigationBarTitleText":"咸鱼日记簿",
        "navigationBarTextStyle":"black:
    },
    "tarBar":{
        "list":[{
            "pagePath":"pages/home/home",
            "text":"日记簿",
            "iconPath":"./img/s1.png",
            "selectedIconPath":"./img.s1.png"
        },{

        }]
    }
}
```
project.config.json 项目相关的配置文件

### 小程序页面生命周期(基本流程以及相关回调函数)  
onLoad 监听页面加载  
onShow  监听页面显示 
onReady 监听页面初次渲染完成    
onHide  监听页面隐藏    
onUnload  监听页面卸载  
### 注册小程序以及如何对接开发者服务器域名的一些注意点和限制规则?（非重点，服务器开启HTTPS，域名要备案）  
### 小程序如何发起网络请求?(wx.request)   
```
wx.request({
    url:'http://....',
    data:this.options,
    success:(res)=>{
        this.setData({
            list:res.data.list
        })
    }
})
```
### 了解小程序的能力？(比如接口，能解决基础问题) 
**罗盘什么的没看** 
* 表单  
```
//wxml  
<form bindsubmit="postForm">
    <input type="text" name="userInput" bindinput="getInput"/>
    <button form-type="submit">Submit</button>
    <text>{{userInput}}</text>
</form>
//js
getInput(e){
    this.setData({
        userInput:e.detail.value
    })
}
postForm(e){
    wx.navigateTo({
        url:'/pages/test/test?num='+e.detail.value.userInput
    })
}
```
* 路由   
wx.switchTab  
跳转到tabBar页面，并关闭其他所有非tabBar页面   
```
//wxml
<text bindtap="jumpIndex">Jump to Index</text>
//js
jumpIndex(){
    wx.switchTab({
        url:'/pages/index/index'
    })
}
```
wx.reLaunch  
关闭所有页面，打开应用内的每个页面  
```
//wxml
<text bindtap="jumpHome">Jump to Home</text>
//js
jumpHome(){
    wx.reLaunch({
        url:'/pages/home/home'
    })
}
```
wx.redirectTo   
关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到tabBar页面  
wx.navigateTo  
保留当前页面，跳转到应用内的某个页面，但是不允许跳转到tabBar页面   
使用**wx.navigateBace**可以返回到原页面   
```
<text bindtap='jump'>Jump</text>
jump(){
    wx.navigateTo({
        url:'pages/jump/jump'
    })
}
//等效于
<navigater url='../jump/jump' open-type="navigate">
Jump
</navigater>
```
### 小程序服务器端API：  
#### 服务端API的调用方式  
1. 需要先获取access_token，然后使用access.token去调用其他API  
2. 如何获取access_token?需要小程序的AppID和AppSecret  
    

## 公众号  
### 客户端-微信服务器-开发者服务器之间的通信    
#### 消息通信  
要进行消息通信，需要开启开发者配置：  
URL：微信服务器要把消息转发到此  
Token：用于验证过程  
//密码  
//加密模式  
#### 开启服务器配置的验证流程：  
1. 开发者设置URL，并在开发者服务器启动Web服务  
2. 填写token和开发者服务器的Token一致  
3. 点击确认，腾讯服务器向开发者服务器URL发起请求
4. 开发者服务器接收请求并验证数据是否合法  
5. 合法则返回指定值  
##### 验证过程请求数据处理  
微信服务器向开发者服务器URL请求并携带以下参数：  
signature timestamp nonce echostr  
开发者服务器按照以下方式验证signature是否合法：  
把token、timestamp、nonce字典排序；排序后的数据拼接成一个字符串；对拼接后的字符串进行sha1加密；加密后的数据和signature对比是否相同；相同则返回echostr，标识此请求来自于微信服务器  
**验证过程使用的是GET请求。而验证成功后，则会使用POST请求转发用户消息。  
转发用户消息以及开发者回复用户消息的格式:XML 
如果开发者服务器不需要回复消息：1.返回空字符 2.返回success**
##### 公众号接口的调用：  
和小程序调用过程一致，都要先获取access_token  
区分公众号和小程序的AppID 和 AppSecret:两个不是相同的，也并无关联  
##### 测试号  
测试号一些特点和限制：  
可以调用大部分高级接口用于开发测试  
无法设置头像和名称  
关注用户有上限，目前为100
### 调用公众号API  

Nginx以及反向代理  
了解Nginx的反向代理模式和应用场景  

# 涉及主要技术  
前后端通信、安全加密、Web协议、数据库、Web开发框架、云服务器、备案