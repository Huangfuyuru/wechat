var mongoose = require("mongoose");
//连接mongoose数据库
//一般只需要连接一次
var url = 'mongodb://148.70.223.218:27017/memory';
mongoose.connect(url);

//监听mongodb数据库的连接状态
//在mongodb对象中，有一个属性叫做connection,该对象表示的就是数据库连接
//通过监视该对象的状态，可以来监听数据库的连接与断开
mongoose.connection.once("open",function(){
    console.log('连接成功')        
})

//schema 创建
var Schema = mongoose.Schema;//将mongoose.Schema赋值给Schema,为的是省事
var userSchema = new Schema({
    name:String,
    tel:String,
    pass:String,
    imgurl:String,
    gender:{
        type:String,
        default:"女"
    },
    age:Number,
    date:{
        type:Date,
        default:Date.now
    }
})
//通过Schema来创建Model
//Model代表的是数据库的集合
//mongoose自动将集合名变成复数
var UserModel = mongoose.model("users",userSchema);

//向数据库中插入一个文档
UserModel.create({
            name:"jisoo",
            tel:"15930300511",
            pass:"123456",
            imgurl:"#",
            age:25
        },function(err){
    if(!err){
        console.log("插入成功")
    }        
})

//查询
//Model.findOne(conditions,projection,options,callback)
//conditions 查询条件 对象
//projection 投影 对象,也可以是字符串 卸载这里意味着要，不要可以写一个-i
//option 查询选项 (skip,limit)
//callback

UserModel.find({name:"jisoo"},{_id:1},function(err,data){
    //data是个数组
    if(!err){
        console.log(data)
    }      
})

UserModel.findById("123",function(err,data){
    if(!err){
        console.log(data)
    }        
})

//修改
//Model.update(condition,doc,option,callback)
//condition 查询条件
//doc 修改后的对象
//options 配置参数
//callback 回调函数
UserModel.updateOne({name:"jisoo"},{$set:{age:26}},function(err){
    if(!err){
        console.log("修改成功")
    }        
})

//第二种创建一个文档对象
var rose = new UserModel({
           
});
//加入集合
rose.save(function(err){
    if(!err){
        console.log("保存成功")
     }        
})

//文档对象方法
UserModel.findOne({name:"jisoo"},function(err,doc){
    if(!err){
        doc.update({$set:{age:27}},function(error){
                if(!error){
                    console.log("修改成功")
                }
                
                })
    
    }    
    //更简单
    //doc.age = 27;
    //doc.save()

    //get 获取文档中的指定属性值
    //doc.get("name")
    //doc.name
    
    //如何一些信息只能管理员看，用户看不到
    //doc = doc.toObject(); 把他变成普通对象
    //delete doc.name
    //console.log(doc)
})
