const pg = require('pg');

//new pg.Pool 是连接池
var pdb = new pg.Client({
    host:'127.0.0.1',
    port:5432,//默认端口号
    user:'hf',
    database:'hfdatabase',
    password:'hf123'
})

pdb.on('error',err=>{
    console.log(err);
    process.exit(1)
})

//如果是连接池，就不用connect 了
pdb.connect();//发起请求

;(async()=>{
    let sql = 'INSERT INTO users(username,password) VALUES ($1,$2)';
    //增删改查用query
    //括号中的数量对应有几个动态值，上面有两个$1 $2
    let retdata = await pdb.query(sql,[
        'hf','123455'
    ]);
    console.log(retdata);
    pdb.end();
})()

