let str = require("./a.js")//需要配置babel
console.log(str)
require("./index.less")
require("./index.css")
// require("@babel/polyfill")
import logo from "./logo.png"
import $ from "jquery"
console.log(window.$)

let fn = ()=>{
    console.log("======")
}
fn();

// let img = new Image();
// img.src=logo
// document.body.appendChild(img);
// class AB{
//     a=1;
// }