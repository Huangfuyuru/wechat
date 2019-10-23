const titbit = require('titbit');

var app = new titbit();

//中间件
//当接收到请求，然后执行中间件
//app.use(async (c,next)=>{
//  console.log('m1');
//  await next(c);
//  console.log('m2');
//
//})
//next(c)就传递给下一个中间件
//当所有的中间件执行完
//才会到 res 那里
//
app.use(async(c,next)=>{
    console.log('m1') ;
    if(c.query.say === 'hey'){
        await next(c);
    } else {
      c.res.body = 'permission deny';
    }
    console.log('m1');

});

app.use(async (c,next)=>{
    console.log('m2');
    await next(c);
    console.log('m2');
},{group:'post',method:['POST','PUT']})
//只有请求是post组中，而且是POST或PUT请求时才会执行这个操作

app.get('/',async c =>{
    c.res.body = 'success'        
});

app.post('/p', async c => {
   c.res.body = c.body;
 }, '@post');//将/p 这个路由分组到post


app.run(8001)
