let str = require("./a.js")//需要配置babel
console.log(str)
require("./index.less")
require("./index.css")
let xhr = new XMLHttpRequest();
//http://localhost:8080/ 写死就会跨域,webpack-dev-server 服务,把这个请求转发给3000接口
xhr.open("GET","/api/user",true)
xhr.onload = function(){
    console.log(xhr.respose);
}
xhr.send();
// require("@babel/polyfill")
import $ from "jquery"
console.log(window.$)

let fn = ()=>{
    console.log("=测试=====测试==.")
}
fn();

// let img = new Image();
// img.src=logo
// document.body.appendChild(img);
class AB{
    a=1;
}