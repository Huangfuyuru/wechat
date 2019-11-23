var MongoClient = require('mongodb').MongoClient;
var DbUrl = 'mongodb://localhost:27017/memory';

function __connectDb(callback){
    MongoClient.connect(DbUrl,(err,db)=>{
        if(err){
            console.log('数据库连接失败');
            return; 
        }
        //增加 修改 删除
        db.close();
        callback(err,db)
    })

}

//数据库查找

exports.find=function(collectionname,json,callback){
    __connectDb(function(err,db){
        var dbo = db.db("memory");
        dbo.collection(collectionname).find(json).toArray((err,data)=>{
            callback(err,data);//拿到数据执行回调函数
        })
    })
}