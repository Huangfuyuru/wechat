#!/usr/bin/node

var http = require('http');

var routeTable = {
'/':(req,res)=>{
	res.end('Hey');
},
'/help':(req,res)=>{
	res.end('help')
}
}

http.createServer((req,res)=>{
console.log('路径信息',req.url);
let path_split = req.url.split('?');
let path = path_split[0];
if(routeTable[path] === undefined){
	res.statusCode = 404;
	res.end('page not found');
	return;
}
routeTable[path](req,res)
}).listen(8001)
