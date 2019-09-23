const titbit = require('titbit');
const fs = require('fs');

async function readFile(filename,encoding = 'utf8'){
    return new Promise()
}
var app = new titbit({
    debug:true
})

var {router} = app; //var router = app.router

router.get('/upload',async c=>{
    c.res.body = 'success'
})

router.post('/p',async c=>{
    c.res.body = c.body;// c.body是请求提交的数据
    //c.res.body是返回的数据
})

app.run(8000,'localhost');