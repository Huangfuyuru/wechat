const pg = require('pg');
const titbit = require('titit');

var app = new titbit({
    debug:true
})

var pgdb = new pg.Pool({
    host:'127.0.0.1',
    port:5432,
    password:'hf123',
    database:'hfdatabase'
})
//获取用户列表
app.get('/user',async c => {
  let sql = 'SELECT id,username FROM users';
  let ret = await pgdb.query(sql);
  if(ret.rowCount <= 0){
    c.res.body={
        status:-1,
        errmsg:'failed get users'
    }
  }else{
    c.res.body = {
        status:0,
        data:ret.rows
    }
  }
 });


//获取用户详细信息
app.get('/user/:id',async c=>{
    let sql = 'SELECT id,username,email FROM users WHERE id = $1';
    let ret = await pgdb.query(sql,[
        c.param.id
    ]);
    
    if(ret.rowCount <= 0){
        c.res.body = {
            status:-1,
            errmsg : 'user not found'
        }
    }else{
        c.res.body = {
            status:0,
            data:ret.rows[0]
        }
    
    }

});

//创建新用户
app.post('/user',async c=>{
    let sql = 'INSERT INTO users (username,email,password) VALUES ($1,$2,$3)';
    //创建新用户的数据在body属性中，是POST请求
    let ret = await pgdb.query(sql,[
        c.body.username,c.body.email,c.body.password
    ])

    if(ret.rowCount <= 0){
        c.res.body={
            status:-1,
            errmsg:'create user failed'
        }
    }else{
        c.res.body={
            status:0,
            data:'ok'
        }
    }
            
})


//更新用户信息
app.put('/user/:id',async c => {
    let sql = 'UPDATE users SET email = $1 WHERE id = $2';
    
    let ret = await pgdb.query(sql,[
        c.body.email,c.param.id
    ]);

    if(ret.rowCount <= 0){
        c.res.body = {
            status:-1,
            errmsg :'updata failed'
        }
    }else{
        c.res.body = {
            status:0,
            data:'ok'
        }
    
    }
        
        
})


//
app.delete('/user/:id',async c => {
    let sql = 'DELETE FROM users WHERE id = $1';
    let ret = await pgdb.query(sql,[
        c.param.id
    ])
    if(ret.rowCount <= 0){
        c.res.body={
            status:-1,
            errmsg : 'can not delete user'
        }
    }else{
        c.res.body={
            status:0,
            data:'ok'
        }
    }
        
})

app.run(8001);















