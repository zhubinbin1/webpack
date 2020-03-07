//webpack node 写
let path =require("path")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssTxtractPlugin= require("mini-css-extract-plugin")
let OptimizeCss = require("optimize-css-assets-webpack-plugin")
let Uglifyjs= require("uglifyjs-webpack-plugin")
let Webpack = require("webpack")
let { CleanWebpackPlugin } = require("clean-webpack-plugin")
let CopyWebpackPlugin = require("copy-webpack-plugin")
// console.log(path.resolve("dist"))
module.exports={
    resolve:{//解析 第三方包common 缩小查找范围
        modules:[path.resolve("node_modules")],//node_modules中查找
        mainFiles:[],//入口文件的名字//没指定就是index.js
        mainFields:["style","main"],
        alias:{//别名
            bootstrap:'bootstrap/dist/css/bootstrap.css'
        },
        //  ./index.js  省略写为./index,后缀省略 逐渐查找
        extensions:['.js','.css','.json']
    },
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
    optimization:{//优化项
        minimizer:[//开发环境不会走
            new Uglifyjs({
                cache:true,
                parallel:true,//并发同时压缩多个
                sourceMap:true,//源码映射
            }),
            new OptimizeCss(),//用这个插件后,js就不会再压缩,配合uglifyjs-webpack-plugin
        ]
    },
    mode:"development",//development,production  production可进行压缩
    // entry:"./src/index.js",//入口
    entry:{
        home:"./src/index.js",
    },
    //源码映射,可帮助调试源代码,会生成一个source map 文件,会标示当前报错的列
    //source-map 大,全,独立.
    //evl-source-map 不会产生单独文件,可以显示行和列,会打包到home.js里
    //cheap-module-source-map 不会产生列,但是是一个单独的映射文件.
    //cheap-module-evl-source-map 不会产生文件,集成在打包后的文件中,也不会产生列,只告诉哪行,没具体哪里报错
    devtool:"source-map",//eg:home.js.map
    watch:false,//监控代码变化,一旦变化代码进行打包,测试:修改home.js
    watchOptions:{//监控选项
        poll:1000,//每秒询问1000次
        aggregateTimeout:500,//防抖,一直输入代码,写一次打包一次?500ms内打包一次.
        ignored:/node_modules/ //不需要监控的文件
    },
    output:{//打包出口 npx webpack npm run build  
        //多出口.[name].js name变量,entry名字
        filename:"[name].js",//filename:"bundle.[hash:8].js"//增加hash,每次修改产生新的文件,防止覆盖,只显示八位
        path:path.resolve(__dirname,"build"),
        // publicPath:"www.baidu.com"//会引入此路径
    },
    plugins:[//数组放所有插件--不分顺序
        new HtmlWebpackPlugin({
            template:"./src/index.html",//模版路径
            filename:"index.html",//输出的文件名字
            }),
        // new CleanWebpackPlugin(),
        // new CopyWebpackPlugin(
        //     [//doc目录中 copy 到build目录中
        //         {from :"doc",to:"./"}
        //     ]
        // ),
        // new Webpack.BannerPlugin(
        //     "make 2020 by binbin"
        // ),
        new Webpack.DefinePlugin({//定义环境变量
            DEV:JSON.stringify("development"),//
            FLAG:"true",//输出是consolog.log(true),而不是consolog.log(“true”)
            EXPRESSION:"1+1"//正常使用会把字符串去掉,
        }),
        new MiniCssTxtractPlugin({
            filename:"css/main.css"//抽离的名字. css目录下
        }),
        new Webpack.ProvidePlugin(//在每个模块中都注入$
           {
            $:"jquery"
           }
        ),

    ],
    externals:{//如果多引入就忽略,外部引入的,不需要打包
        jquery:"$"
    },
    module:{//模块
        rules:[//规则 执行顺序r-l b-t
            {
                test: /\.(htm|html)$/i,
                use:{
                    loader: 'html-withimg-loader',
                    options:{
                        // enforce:"pre"
                    }
                }
            },
            {
                test:/\.(png|jpg|gif)$/,
                //可做一个限制
                use:{
                    loader:"url-loader",
                    options:{//小的话以base64存储
                        limit:1,//200*1024
                        outputPath:"/images/",//如果是base64 不会输入到此
                        esModule: false,//index.html 中引入<img src 失败问题  https://segmentfault.com/q/1010000021251426?utm_source=tag-newest
                        // publicPath:"www.baidu.com"//会引入此路径
                    }
                },
                // use:"file-loader"
            },
        
            // {
            //     test:require.resolve("jquery"),
            //     use:{
            //         loader:"expose-loader?$"
            //     }
            // },
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:"eslint-loader",
            //         options:{
            //             enforce:"pre"//previout  强制在前执行,正常执行顺序r-l b-t   还有:normal post
            //         }
            //         },
            // },
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{//用babel-loader es6-es5
                        presets:[
                            //记得别忘记@
                            "@babel/preset-env"//预设,调用这个模块转化
                        ],
                        plugins:[
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime"//需要配置exclude,使用生成器等需要这个
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'),//包括指定目录
                exclude:/node_modules/   //排除此目录
            },
            //css-loader 解析@import
            //style-loader //把css插入到head 标签 中,希望单一
            //loader 如果是一个用字符串,多个loader需要[]
            //loader 执行顺序:默认从右向左执行. 从下到上,先处理css,再处理style
            //还可以写成对象:
            // { test:/\.css$/,user:["style-loader","css-loader"]},  
            { test:/\.css$/,
                use:[
                    MiniCssTxtractPlugin.loader,
                    //替换by miniplugin
                //     {
                // loader:"style-loader",//好处再传染参数,options
                // options:{
                //     // insert:"top",//{ injectType?, attributes?, insert?, base?, esModule? }.可选项,比如再html中增加style样式,放到顶部,覆盖styles
                // }
                // },
                "css-loader",
                "postcss-loader",
            ]},//less-css
            //处理less文件,sass,stylus node-sass sass-loader
            //stylus stylus-loader
            { test:/\.less$/,
                use:[
                    MiniCssTxtractPlugin.loader,//如果用多个,copy MiniCssTxtractPlugin eg:MiniCssTxtractPlugin2
                // {
                //     loader:"style-loader",//好处再传染参数,options
                //     options:{
                //         //这个内容不能加,加以后样式没变化
                //         // insert:"top",//{ injectType?, attributes?, insert?, base?, esModule? }.可选项,比如再html中增加style样式,放到顶部,防止覆盖
                //     }
                // },
            "css-loader",//@import 解析路径
            "postcss-loader",//解析css之前加前缀
            "less-loader"]
            }//less-css
        ]
    }
}