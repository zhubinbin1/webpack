


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










