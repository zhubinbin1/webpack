//webpack node 写
let path =require("path")
let Webpack = require("webpack-cli")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let Happypack = require("happypack")
module.exports={
    devServer:{//开发服务器的配置 webpack-dev-server   ==不配置默认以当前目录做静态目录
        port:3000,
        progress:true,//进度条
        contentBase:"./build",//在次文件夹做静态服务.
        open:true,//自动打开浏览器
        // comress:true,//进行压缩
    },
    mode:"development",//development,production  production可进行压缩
    entry:{
        react:["react","react-dom"],
    },
    
    output:{//打包出口 npx webpack npm run build  
        //多出口.[name].js name变量,entry名字
        filename:"_dll_[name].js",//filename:"bundle.[hash:8].js"//增加hash,每次修改产生新的文件,防止覆盖,只显示八位
        path:path.resolve(__dirname,"build"),
        library:"_dll_[name]",//_dll_react
        libraryTarget:"var"//umd...commonjs
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"Happypack/loader?id=js",
                include:path.resolve(__dirname,'src'),//包括指定目录
                exclude:/node_modules/   //排除此目录
            },
            {
                test:/\.css$/,
                use:"Happypack/loader?id=css",
                include:path.resolve(__dirname,'src'),//包括指定目录
                exclude:/node_modules/   //排除此目录
            },
        ]
    },
    plugins:[
        new Happypack({
            id:"css",
            use:[
                "style-loader",
                "css-loader",
            ]
        }),
        new Happypack({//多线程打包.使用这个插件,项目大的时候可以使用这种方式打包会快,项目小反而会慢
            id:"js",
            use:[//　数组
                {
                loader:"babel-loader",
                options:{//用babel-loader es6-es5
                    presets:[
                        //记得别忘记@
                        "@babel/preset-env"//预设,调用这个模块转化
                    ],
                    plugins:[
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-transform-runtime",//需要配置exclude,使用生成器等需要这个
                        "@babel/preset-react",
                    ]
                }
                }
            ]
        }),
        new Webpack.DllReferencePlugin({
            mainfest:path.resolve(__dirname,"build","mainfest.json")//先在指定文件夹查找清单,找不到再打包
        }),
        new Webpack.DllPlugin({
            name:"_dll_[name]",
            path:path.resolve(__dirname,"build","mainfest.json")//生成任务清单,
            //html 中引用script,先在指定文件夹查找清单,找不到再打包<script src="/dll_react.js"></script>
            //再次打包包就很小了
        }),
        new HtmlWebpackPlugin({
            template:"./src/index.html",//模版路径
            filename:"index.html",//输出的文件名字
            }),
     

    ]
   
}