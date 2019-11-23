var express = require('express'),
    app = express();
var bodyParser = require('body-parser');

//设置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
 
//使用ejs模板引擎，默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));
app.get('/',(req,res)=>{
        res.end('index')
        })
app.get('/login',(req,res)=>{
        res.render('login')
        })
//获取登陆提交的数据
app.post('/doLogin',(req,res)=>{
        //获取数据
        req.body
        })
app.get('/product',(req,res)=>{
        res.end('product')
        })
app.listen(8080)
