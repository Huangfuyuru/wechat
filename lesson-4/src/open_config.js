const titbit = require('titbit');
const crypto = require('crypto');

var app = new titbit();

var {router} = app;

router.get('/home/msg', async c => {
    var token = 'msgtalk';

    var urlargs = [
        c.query.nonce, //随机数
        c.query.timestamp, //时间戳
        token //自己设计的token
    ];

    urlargs.sort();  //字典排序

    var onestr = urlargs.join(''); //拼接成字符串
    
	//生成sha1签名字符串
    var hash = crypto.createHash('sha1');
    //进行hash散列计算
    var sign = hash.update(onestr);
        
    //转换成16进制字符串编码格式和signature对比
    //如果相同则返回随机字符串
    if (c.query.signature === sign.digest('hex')) {
        c.res.body = c.query.echostr;
    }
});

router.post('/home/msg',async c=>{
    //输出获取消息数据
    console.log(c.body);
})
app.run(8001, 'localhost');
