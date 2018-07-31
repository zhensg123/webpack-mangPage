'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const portfinder = require('portfinder')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = merge(baseWebpackConfig, {
   module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        // hot: true, //热模块更新
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            { warnings: false, errors: true } :
            false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        //DefinePlugin用来配置全局变量
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        //热更新插件
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),//即使有错误也不会中断
 
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }]),
        //暴露全局变量,路径采用绝对路径
        new webpack.ProvidePlugin({
           Vue:path.join(__dirname,"../node_modules/vue/dist/vue.min.js")
        }),
        //可以将css代码分离出来,如果不适用,分离成单独的文件，默认是自动注入到内部的
         new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css',
        }),

    ]
})