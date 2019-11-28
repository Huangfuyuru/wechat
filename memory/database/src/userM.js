require('../modules/collection');
var User = require('../modules/User')
//增加用户
function addUser(person){
    var user = new User({
        name:person.name,
        tel:person.tel,
        pass:person.pass,
        imgurl:person.imgurl,
        age:person.age,
        gender:person.gender,
    })
    user.save()
}

//验证登陆
function login(tel,pass,callback){
    User.findOne({tel:tel,pass:pass},function(err,data){
        //console.log(data)
        callback(err,data)
    })
}

//修改密码
function changePass(tel,pass,newpass,callback){
    User.findOne({tel:tel,pass:pass},function(err,user){
        if(!err){
            user.update({$set:{pass:newpass}},function(error){
                callback(error)
            })
        }
    })
   
}

//返回用户id

exports.addUser = addUser
exports.login = login
exports.changePass = changePass