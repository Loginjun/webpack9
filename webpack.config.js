const PATH = require('path');
const HTML_WENPACK_PLUGIN = require('html-webpack-plugin');
const MINI_CSS_EXTRACT_PLUGIN = require('mini-css-extract-plugin');
module.exports = {
    mode:'development',
    entry:{
        app:'./app/app.js'
    },
    output:{
        path:PATH.resolve(__dirname+'/public'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.(png|gif|jpg|jepg)$/,
                use:[
                    {loader:'url-loader',options:{limit:10240}}
                ]
            },
            {
                test:/\.html?$/,
                use:[
                    {loader:'html-withimg-loader'}
                ]
            },
            {
                test:/\.css$/,
                use:[
                    // {loader:'style-loader'}, //未分离

                    //分离
                    {loader: MINI_CSS_EXTRACT_PLUGIN.loader},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    // {loader:'style-loader'}, //未分离

                    //分离
                    {loader: MINI_CSS_EXTRACT_PLUGIN.loader},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
            }
        ]
    
    },
    plugins:[
        //处理插件
        new HTML_WENPACK_PLUGIN({
            //模板路径
            template:'./app.html',

            inject:'body',
            //输出模板文件名称
            filename:'dev.html',

            minify:{
                //移除注释
                removeComments:true,
                //移除属性的引号
                removeAttributeQuotes:true,

                //合并空白字符
                collapseWhitespace:true

            }
        }),

        new MINI_CSS_EXTRACT_PLUGIN({
            filename:'[name].css'
        })
    ]

}