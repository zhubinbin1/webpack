let {smart} =require("webpack-merge")
let base = require("./webpack.base.js")
let Uglifyjs= require("uglifyjs-webpack-plugin")
let OptimizeCss = require("optimize-css-assets-webpack-plugin")

module.exports=smart(base,{
    mode:"production",//development,production  production可进行压缩

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
})