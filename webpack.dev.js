let {smart} =require("webpack-merge")
let base = require("./webpack.base.js")
module.exports=smart(base,{
    mode:"development",//development,production 
    devServer:{//开发服务器的配置 webpack-dev-server   ==不配置默认以当前目录做静态目录
        // port:3000,
        proxy:{
            "/api":{//从写/api干掉再发请求 把/api路径干掉
                target:'http://localhost:3000',
                pathRewrite:{ "/api":""}//从写的方式把请求代理到express服务器上
            }//想当配置了一个代理,访问api开头的去3000端口找,记得去掉  port:3000,
        },
        progress:true,//进度条
        contentBase:"./build",//在次文件夹做静态服务.
        open:true,//自动打开浏览器
        // comress:true,//进行压缩
    },
    devtool:"source-map",//eg:home.js.map
})