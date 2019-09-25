const wxkey = require('./weixinlib/wxkey');
const gohttp = require('gohttp');

var tokenurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxkey.appid}&secret=${wxkey.secret}`;


gohttp.get(tokenurl).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})
