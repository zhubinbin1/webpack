


### 初始化工程:
## yarn init -y
## yarn add webpack webpack-cli -D

## 打包:npx webpack
 生成dist-main.js 文件


 ## 手动配置:
 默认配置文件名字:webpack.config.js

 ## 自定义配置文件 
 npx webpack --config webpack.config.my.js
 可通过package.json 中配置
  "scripts": {
    "build":"webpack --config webpack.config.my.js"
  }
  然后执行 npm run build
  如果需要传递参数,那么npm run build 后面加-- eg: npm run -- --config webpack.config.my.js"


  ## 配置服务:
   yarn add webpack-dev-server -D
   npx webpack-dev-server   //文件写到内存中
   npm run dev //配置后可执行


## 自动创建index.html
   //自动创建html打包到内存中--插件 HtmlWebpackPlugin
   命令: yarn add html-webpack-plugin -D

## css 解析
看webpack.config.js modules配置, 测试时候需要npm run build ,npm run dev
yarn add css-loader style-loader

less:
yarn add less-loader -D


## 文件单独抽离css样式插件  --插件都是类    
yarn add mini-css-extract-plugin -D 抽离css文件  链接 https://github.com/webpack-contrib/mini-css-extract-plugin

自动添加前缀 --eg: webkit-transform
yarn add postcss-loader autoprefixer 
模块中增加 postcss-loader  //配置 postcss.config.js 否则报错No PostCSS Config found


## 压缩css
uglifyjs-webpack-plugin 压缩js,optimize-css-assets-webpack-plugin压缩css,需要在生产环境测试
yarn add optimize-css-assets-webpack-plugin -D https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
yarn add uglifyjs-webpack-plugin -D
https://www.npmjs.com/package/uglifyjs-webpack-plugin


## js 高版本转化 es6-es5
yarn add babel-loader @babel/core @babel/preset-env -D

//es7进行转化:class A{a=1;}
yarn add @babel/plugin-proposal-class-properties -D
//装饰器  @log  class A{a=1;}
yarn add @babel/plugin-proposal-decorators -D

## 处理js语法及校验

代码运行时候的包
https://babeljs.io/

 yarn add @babel/plugin-transform-runtime -D 并配置webpack.config.js
 yarn add @babel/runtime //无-D

 实例方法不会解析 eg: "aaa".includes("a") 
 yarn add @babel/polyfill //无-D
 使用:require("@babel/polyfill")


 ## eslink 使用规范--增加校验当前代码是否规范
 http://eslint.cn/

 yarn add eslint eslint-loader -D
https://eslint.org/docs/user-guide/getting-started
 下载  .eslintrc.json 放到根目录前面有. 

  ## 全局变量的引用

  yarn add jquery
  import $ from "jquery",第三方可能依赖jquery
  console.log($)//fn函数
  //变量暴露给window
  window.$
  引用模块:expose-loader//全局的loader 内联loader 
  yarn add expose-loader -D
  //pre前执行.
  //normal 
  //后置 post
  eg:  import $ from "expose-loader?$!jquery"
  //把jquery暴露出去,暴露给全局window.$就可以用了
  配置中:
  {
                test:require.resolve("jquery"),
                use:{
                   loader:"expose-loader?$"
                }
    },

调用:
import $ from "jquery"
console.log(window.$)//全局可引用

如果不引入import $ from "jquery" 在每个模块中注入$对象
需要插件
let Webpack = require("webpack")
注释:
            // {
            //     test:require.resolve("jquery"),
            //     use:{
            //         loader:"expose-loader?$"
            //     }
            // },
增加 
new Webpack.ProvidePlugin(//在每个模块中都注入$
           {
            $:"jquery"
           }
        ),

//1)export-plugin 暴露在window上,eg:window.$
//2)ProvidePlugin 每个模块都提供$, 直接使用,
//3)引入不打包
配置:
 externals:{//如果多引入就忽略,外部引入的,不需要打包
        jquery:"$"
    },


## 使用图片,并打包图片

1在js中创建图片引入
let img = new Image();
img.src="./logo.png"//这样认为就是一个字符串,打包也就是一个字符串
document.body.appendChild(img);
  可以使用
  import logo from "./logo.png";//把图片引入,返回是一个新的图片地址,需要loader解析 file-loader 默认会在内部生成一张图片放到build目录下,生成的名字返回
  执行 img.src=logo
yarn add file-loader -D

2在css中引入 background("url")
 background: url("./logo.png");
3 在html中 <img src="./logo.png">
yarn add html-withimg-loader -D
npm install html-withimg-loader --save

//图片转成base64
yarn add url-loader -D

 publicPath:"www.baidu.com"//会引入此路径,src的img图片前缀会加上www.baidu.com,or href
如果只有图片加那么在图片中的options 添加就好publicPath:"www.baidu.com"/


## 打包多页面应用

webpack.config1.js 非多页面应用打包.
webpack.config.js 
entry增加两个入口,出口用[name].js 处理
new 两个HtmlWebpackPlugin
chunks:["home"]


## source map

 //源码映射,可帮助调试源代码,会生成一个source map 文件,会标示当前报错的列
    //source-map 大,全,独立.
    //evl-source-map 不会产生单独文件,可以显示行和列,会打包到home.js里
    //cheap-module-source-map 不会产生列,但是是一个单独的映射文件.
    //cheap-module-evl-source-map 不会产生文件,集成在打包后的文件中,也不会产生列,只告诉哪行,没具体哪里报错
    devtool:"source-map",//eg:home.js.map

## watch 用法
避免每次更新代码都需要npm run build
webpack-dev-server 不能马上看到实体文件(build文件)

配置:
    watch:true,//监控代码变化,一旦变化代码进行打包
    watchOptions:{//监控选项
        poll:1000,//每秒询问1000次
        aggregateTimeout:500,//防抖,一直输入代码,写一次打包一次?500ms内打包一次.
        ignored:/node_modules/ //不需要监控的文件
    },


## 插件介绍: 
1,cleanWebpackPlugin --第三方 相当于清除生成的build目录
  yarn add clean-webpack-plugin -D
  let { CleanWebpackPlugin } = require("clean-webpack-plugin")
    new CleanWebpackPlugin(),
2,copyWebpackPlugin -- 第三方
  yarn add copy-webpack-plugin -D
  let CopyWebpackPlugin = require("copy-webpack-plugin")
   new CopyWebpackPlugin(
            [//doc目录中 copy 到build目录中, 以doc为例子
                {from :"doc",to:"./"}
            ]
        ),
3,bannerPlugin --内置的  版权归xxx
let Webpack = require("webpack")
  new Webpack.BannerPlugin(
            "make 2020 by binbin"
        ),
输出结果 home.js 头部:
/*! make 2020 by binbin */


## webpack 跨域问题

写一个server.js 
index.js处理:
let xhr = new XMLHttpRequest();
//http://localhost:8080/ 写死就会跨域,webpack-dev-server 服务,把这个请求转发给3000接口
xhr.open("GET","/api/user",true)
xhr.onload = function(){
    console.log(xhr.respose);
}
xhr.send();
 // 配置
        // port:3000,
        proxy:{
          //第一种
            "/api":{//从写/api干掉再发请求 把/api路径干掉
                target:'http://localhost:3000',
                pathRewrite:{ "/api":""}//从写的方式把请求代理到express服务器上
            }//想当配置了一个代理,访问api开头的去3000端口找,记得去掉  port:3000,
        },
      //第二种   前端只是单纯模拟数据实现功能--无服务端
        before(){
            //钩子,无服务了,通过这个方法返回数据
            app.get("/api/user",(req,res)=>{
                res.json({name:"binbin-before"})
            })
        },
        //第三种  有服务端--不想用代理处理,在服务端启动webpack,端口用服务端端口--服务端自己写的
        // yarn add webpack-dev-middleware 可以在服务端启用webpack
        //服务端启用webpack
        // let webpack= require("webpack")
        // let middle = require("webpack-dev-middleware");
        // let config = require("./webpack.config.js");
        // let compiler = webpack(config);
        // app.use(middle(compiler))



## resolve 使用
 
 比如样式
 yarn add bootstrap
 //bootstrap第三方样式库
 resolve:{//解析 第三方包common 缩小查找范围
        modules:[path.resolve("node_modules")],//在这个包中查找
         mainFields:["style","main"],//先在style查找,再找main
         mainFiles:[],//入口文件的名字//没指定就是index.js
        alias:{//别名
            bootstrap:'bootstrap/dist/css/bootstrap.css'
        },
        //  ./index.js  省略写为./index,后缀省略 逐渐查找
        extensions:['.js','.css','.json']
  },
 import "bootstrap" 没加./在当前目录下的node_modules查找


 ## webpack 定义环境变量

 需求:依据开发环境和上线环境进行判定
 if(DEV){
   //....
 }else{
   //.....
 }
 let Webpack = require("webpack")
  new Webpack.DefinePlugin({//定义环境变量
            DEV:JSON.stringify("development"),//
            FLAG:"true",//输出是consolog.log(true),而不是consolog.log(“true”)
            EXPRESSION:"1+1"//正常使用会把字符串去掉,
        }),

//建立两个文件,webpack.dev.js webpack.prod.js 改webpack.config.js-webpack.base.js 

需要增加merge方法
yarn add webpack-merge
单独写两个文件,配置生产环境和开发环境
//执行命令:可在package.js中配置
npm run build -- --config webpack.dev.js
npm run build -- --config webpack.prod.js