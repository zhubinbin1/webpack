
//express webpack自带的
let express = require("express");
let app= express();

//服务端启用webpack
let webpack= require("webpack")
let middle = require("webpack-dev-middleware");
let config = require("./webpack.config.js");
let compiler = webpack(config);
app.use(middle(compiler))
//启用服务: node server.js
//访问 http://localhost:3000/api/user 可以获取数据,相当于启动了服务.访问http://localhost:3000 也可以拿到结果

app.get("/api/user",(req,res)=>{
    res.json({name:"binbin"})
})
//默认是8080 ,写成3000就是跨域了,
app.listen(3000);







// //express webpack自带的
// let express = require("express");
// let app= express();

// app.get("/api/user",(req,res)=>{
//     res.json({name:"binbin"})
// })
// //默认是8080 ,写成3000就是跨域了,
// app.listen(3000);


//右键run code 启动
// 浏览器直接访问 localhost:3000/api/user