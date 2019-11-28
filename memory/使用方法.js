//将database 放入你的文件夹，确保你的依赖中有mongoose模块
//如果没有先安装一下 npm install mongoose --save

//userM 是user表的一些方法
//LoverM 是lover表的一些方法
//childM 是child表的一些方法
var userM = require('./database/src/userM');
var LoverM = require('./database/src/loverM');
var ChildM = require('./database/src/childM');

/* 
    验证手机号，密码是否正确
    将 用户的手机号，密码传入，
    如果正确 输出手机号密码正确
    data中拿到了用户信息，
    data.id是用户id
*/

userM.login("15930300511","1234567",function(err,data){
    if(err || data == null){
        console.log("手机号或密码不正确")
    }else{
        console.log("手机号、密码正确")
        console.log(data.id)
    }
})

userM.loginPromise = (args) => {
    return new Promise((rv, rj) => {
        userM.login("15930300511","1234567",function(err,data){
            if(err || data == null){
                rj (err);
                console.log("手机号或密码不正确")
            }else{
                rv(data);
                console.log("手机号、密码正确")
                console.log(data.id)
            }
        })
    })
};


/*
    修改密码，传入手机号，旧密码，新密码
*/
/*
userM.changePass("15930300511","123456","1234567",function(err){
    if(err){
        console.log("修改失败")
    }else{
        console.log("修改成功")
    }
})
*/

/*插入一个用户，示例
新建一个用户，如下
将用户插入userM.addUser()
var person = {
    name:"rose",
    imgurl:"#",
    pass:"123456",
    tel:"15930300513",
    gender:"男"
}

userM.addUser(person);
*/

/*插入一个爱人
  uid 是用户的id
  应该先拿到用户的id
var person = {
    name:"金梦",
    gender:"男",
    uid:"5dda60b6dd29fcb57c0a9441",
    ldate:"#"
}
LoverM.addLover(person)
*/

/*
插入一个亲子
  uid 是用户的id
  应该先拿到用户的id
var person = {
    name:"小海",
    birthday:"#",
    gender:"女",
    uid:'5dda60b6dd29fcb57c0a9441'
}
ChildM.addChild(person)
*/
