const gohttp = require('gohttp');
const wxkey = require('./weixinlib/wxkey');

var tokenurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxkey.appid}&secret=${wxkey.secret}`;

gohttp.get(tokenurl).then(data => {
    console.log(data);
    let jsond = JSON.parse(data);
    if (jsond.access_token == undefined) {
        throw new Error(data);
    }
    return jsond.access_token;
}, err => {
    throw err;
})
.then(async t => {
    var imgcheckurl = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${t}`;
    let ret = await gohttp.upload(imgcheckurl, {
        files : {
            media : './t.jpg'
        }
    });
    console.log(ret);
})
.catch (err => { console.log(err); });
