const http = require('http');
const url = require('url');

http.createServer((req, res) => {

    //true表示默认解析querystring（查询字符串）
    let urlobj = url.parse(req.url, true);

    console.log(urlobj);
    
    res.end('ok');

    req.on('end',function(){
        res.end(JSON.stringify(urlobj.query));
    })
})
.listen(8080, 'localhost');
