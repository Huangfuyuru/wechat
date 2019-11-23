var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/memory';
var session = require('express-session');
//设置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
 
//使用ejs模板引擎，默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));

//配置session
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

app.use(function(req,res,next){
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

app.get('/',(req,res)=>{
        res.end('index')
        })
app.get('/login',(req,res)=>{
        res.render('login')
        })
//获取登陆提交的数据
app.post('/doLogin',(req,res)=>{
        //获取数据
        console.log(req.body.utel,req.body.upass)
        userLogin(res,req.body.utel,req.body.upass);
        })
app.get('/product',(req,res)=>{
        res.end('product')
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

function userLogin(res,utel,upass){
        MongoClient.connect(url,{userNewUrlParse:true},(err,db)=>{
        if(err) throw err;
        var whereStr = {"utel":utel};
        var dbo = db.db("memory")
        dbo.collection("user").find(whereStr).toArray((err,result)=>{
                console.log(result[0].upass)
                if(err){
                console.log(err.message);
                res.end('No')
                }
                if(result[0].upass == upass){
                console.log('yes');
                //保存用户信息
                session.userinfo=result[0];
                res.redirect('/product');
                db.close()
                }
                db.close()
                
        })
                
        })

}
app.listen(8080)
