const http=require("http");
const url=require("url");
const qs = require('querystring');

http.createServer((req,res)=>{
  console.log(req.method);//请求方式
  res.writeHead(200,{
    "Access-Control-Allow-Origin":"*"
  });
  if(req.method=="GET"){
    req.query=url.parse(req.url,true).query;
    console.log(req.query);//请求参数
    var {uname,upwd}=req.query;
    if(uname=="dingding"&&upwd=="123456"){
      res.write(JSON.stringify({code:1}))
    }else{
      res.write(JSON.stringify({code:0}))
    }
    res.end();
  }else{
    var body="";
    //每当接收到请求体数据，累加到post中
    req.on('data', function (chunk) {
      body += chunk;
      console.log("chunk:",chunk);
    });
    req.on('end', function () {
      // 解析参数
      req.body = qs.parse(body);  //将一个字符串反序列化为一个对象
      console.log(req.body);
      var {uname,upwd}=req.body;
      if(uname=="dingding"&&upwd=="123456"){
        res.write(JSON.stringify({code:1}))
      }else{
        res.write(JSON.stringify({code:0}))
      }
      res.end();
    })
  }
}).listen(3000);