const gohttp = require('gohttp');
const wxkey = require('./weixinlib/wxkey');

var tokenurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxkey.appid}&secret=${wxkey.secret}`;

gohttp.get(tokenurl).then((data,err)=>{
    console.log(data);
    if(err){
        console.log(err)
    }    
})
