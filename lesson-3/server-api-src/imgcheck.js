const gohttp = require('gohttp');
const wxkey = require('./weixinlib/wxkey');

var tokenurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxkey.appid}&secret=${wxkey.secret}`;

(async function(){
    try{
         //解析成JSON对象，如果发现没有获取到access_token则抛出错误
        let data = await gohttp.get(tokenurl);
        let ret = JSON.parse(data);
        if(ret.access_token === undefined){
            throw new Error(data)
        }

        //图片检查url
        let imgcheckurl = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${ret.access_token}`;
        ret = await gohttp.upload(imgcheckurl,{
            method:'POST',
            files:{
                media:'blackpink.jpg'
            }
        })

        console.log(ret);
    }catch(err){

    }
})();
// gohttp.get(tokenurl).then(data=>{
//     console.log(data);

//     //解析成JSON对象，如果发现没有获取到access_token则抛出错误
//     let ret =JSON.parse(data);
//     if(ret.access_token === undefined){
//         throw new Error(data)
//     }

//     //构造图片检查url
//     let imgcheckurl = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${ret.access_token}`;

//     //上传图片，请求类型为POST
//     return gohttp.upload(imgcheckurl,{
//         method:'POST',
//         files:{
//             media:'blackpink.jpg'
//         }
//     }).then(data=>{
//         console.log(data)
//     },err=>{
//         console.log(err)
//     })

// },err=>{

// })




