'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        index: './src/js/index.js',
        cart:'./src/js/cart.js'
    },
    output: {
        path: path.join(__dirname, "./dist"), //输出是绝对路径
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'Vue': '../node_modules/vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                       limit: 10000,
                       name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
            // }, {
            //     test: /\.scss$/,
            //     include: [resolve('src')],
            //     exclude: /node_modules/,
            //     loader:["style-loader","css-loader","sass-loader"]
              

            //     // ExtractTextPlugin.extract({
            //     //     fallback:"style-loader",
            //     //     use:"css-loader!sass-loader"
            //     // }) 
            // }
        ]
    },
    plugins:[
              // https://github.com/ampedandwired/html-webpack-plugin
         //通过增加HtmlWebpackPlugin来增加入口
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ["index"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            },
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart.html',
            chunks: ["cart"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            },
            inject: true
        }),
         //可以将css代码分离出来,如果不适用,分离成单独的文件，默认是自动注入到内部的
        //  new ExtractTextPlugin({
        //     filename: 'css/[name]-[hash].css',
        // }),

    ]
}