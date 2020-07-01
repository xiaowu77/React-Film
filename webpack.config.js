const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') //导入 在内存中自动生成 index页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname,'./src/index.html'),//源文件
    filename: 'index.html'//生成的内存中的首页名称
})
//向外暴露一个打包的配置对象；webpack基于Node构建，所以webpack支持所有Node API和语法
module.exports = {
    mode: 'development', // development 开发模式  production 生产模式（代码会自动压缩）
    plugins:[
        htmlPlugin
    ],
    module: {//所有第三方 模块的配置规则
        rules: [//第三方匹配规则
            {test:/\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },//千万别忘记添加exclude排除项
            //可以在css-loader之后，通过？追加参数
            //其中，有个固定的参数，modules，表示为普通的css样式表，启动模块化
            {test: /\.css$/, use:['style-loader','css-loader']},//打包处理css样式表的第三方loader
            {test: /\.png|ttf|woff|woff2|eot|svg$/,use: 'url-loader'}, //打包处理 字体文件 loader
            {//打包处理scss的文件 loader
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]--[local]--[hash:base64:5]',
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
        ]
    },
    resolve:{
        extensions:[".js", ".jsx", ".json"], //表示文件的后缀名，可以省略不写。
        alias:{
            '@':path.join(__dirname,'./src')//表示设置路径别名这样在import的文件在src下的时候可以直接 @/component/...
        }
    }
}

//目前不行； 这是ES6中向外导出模块的api 相对应的导出 是import ** from
//export default {}