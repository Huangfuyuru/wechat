#!/usr/bin/node

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var server = http.createServer(function(req,res){
        setTimeout(function(){
                //设置消息头
                res.setHearder('Content-Type','text/html;charset=utf-8')
                res.writeHead(200,'haa')
                //url.parse 将一个url字符串转换成对象并返回
                var pathObj = url.parse(req.url,true)
                console.log(pathObj)
                console.log(req.url)
                switch(pathObj.pathname){
                    case '/getday':
                        var ret
                        if(pathObj.query.day == "sunday"){
                            console.log(pathObj.query.day)
                            ret = {
                                day:'sunday',
                                weather:'晴天'
                            }
                        }else{
                            ret = {
                                day:pathObj.query.day,
                                weather:"我也不知道什么天气"
                            }
                        }
                        res.end(JSON.stringify(ret))
                        break;
                    case '/user/123':
                        res.write('<!doctype html><head></head><body><h1>现在展示的是readme的内容</h1></body></html>')
                     
                }

            },3000)
        });
server.listen(8001);
