const gohttp = require('gohttp');
const gzhkey = require('./gzhkey');

//我们来获取token值
//token是为了
var token_api = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${gzhkey.appid}&secret=${gzhkey.appsecret}`;

gohttp.get(token_api).then(d=>{
    console.log(d)
});
