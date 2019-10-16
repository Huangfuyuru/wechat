const gohttp = require('gohttp');
const gzhkey = require('./gzhkey');

var token_api = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${gzhkey.appid}&secret=${gzhkey.appsecret}`;

var menu_data = {
    button : [
        {
            name : '发图',
            type : 'pic_photo_or_album',
            key: "rselfmenu_1_1", 
            sub_button: [ ]
            // 会跳转到这个网站
        },
        {
            name : 'Send',
            type : 'click',
            key : 'send-msg'  
            // 设定的key会被以消息的形式转发到服务器端
        },
        {
            name : '二级菜单',
            sub_button : [
                {
                    name : '百度',
                    type : 'view',
                    url : 'https://www.baidu.com/'
                },
                {
                    name : '发送地址',
                    type : 'location_select',
                    key : "rselfmenu_2_0"
                },
                {
                    name : '扫码',
                    type : 'scancode_waitmsg',
                    key : "rselfmenu_0_0", 
                    sub_button : []
                }
            ]
        }
    ]
};

async function createMenu(){
    let ret = await gohttp.get(token_api);
    let t = JSON.parse(ret);

    //没有获取成功
    if(t.access_token === undefined){
        console.log(ret);
        process.exit(-1);
    }
    var create_menu_api = ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${t.access_token}`;

    ret = await gohttp.post(create_menu_api,{
        body : menu_data,
        headers : {
            //此消息头的key值应该小写
            "content-type":"text/plain"
        }
    });
    console.log(ret)
};

createMenu();