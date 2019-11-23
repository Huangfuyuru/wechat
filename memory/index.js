var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/memory';

//保存用户信息
var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { 
                maxAge:1000*60*30
              },
              rolling:true
        }))

//自定义中间件，判断登陆状态
app.use(function(res,req,next){
    if(req.url == '/login'|| req.url == '/doLogin'){
        next();
    }else{
    if(session.userinfo && session.userinfo.utel!=''){
        next();
    }else{
        res.redirect('/login')
    }
    }
})
app.get('/add',(req,res)=>{
  //userAdd(7,"jennie",'#',"女","123456","12345");
  userLogin("15930300511","123456");
  //console.log(log);
  res.end('OK')
})
function userAdd(uid,uname,uimage,usex,upass,utel){
  MongoClient.connect(url,{userNewUrlParse:true},function(err,db){
    if(err) throw err;
    console.log('数据库已经创建');
    var dbo = db.db("memory");
    dbo.collection("user").insertOne({
    "uid":uid,
    "uname":uname,
    "uimage":uimage,
    "usex":usex,
    "upass":upass,
    "utel":utel
    },function(err,res){
    if(err) throw err;
    console.log('插入成功');
    db.close()
    })
 
    })
}

// function userLogin(utel,upass){
//     MongoClient.connect(url,{userNewUrlParse:true},(err,db)=>{
//         if(err) throw err;
//         var whereStr = {"utel":utel};
//         var dbo = db.db("memory")
//         dbo.collection("user").find(whereStr).toArray((err,result)=>{
//             if(err) throw err;
//             if(result.upass == upass){
//                console.log('yes');
//                //保存用户信息
//                session.userinfo=result;

//             }
//             db.close()
                
//         })
            
//     })

// }
app.listen('8080')
