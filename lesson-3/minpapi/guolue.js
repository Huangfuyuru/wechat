module.exports  = async (c,next) => {
    //使用url参数进行权限限制
    //实际使用需要更严格的检测机制
    if(c.query.apipass === '10001'){
        await next(c)
    }else{
        c.res.body={
            status:-1,
            errmsg :'deny'
        }
    }

}
