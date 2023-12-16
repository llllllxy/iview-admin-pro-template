const path = require("path");
const webpack = require("webpack");
const WebpackBar = require('webpackbar');
const resolve = (dir) => {
    return path.join(__dirname, dir);
};


module.exports = {
    publicPath: "./", // ./相对路径
    outputDir: "dist",
    productionSourceMap: false,// 打包时不生成.map文件
    // 这里写你调用接口的基础路径，来解决跨域
    devServer: {
        port: 9084,
        open: true,
        proxy: {
            '/dev-api': {
                target: 'https://www.fastmock.site/mock/00e1901228c9f92cbd69705ba612eece/pro-api',
                pathRewrite: { '^/dev-api': '' }
            },
            '/pro-api': {
                target: 'https://www.fastmock.site/mock/00e1901228c9f92cbd69705ba612eece/pro-api',
                pathRewrite: { '^/pro-api': '' }
            }
        }
    },
    configureWebpack() {
        return {
            plugins: [
                new WebpackBar({
                    color: "green",  // 默认green，进度条颜色支持HEX
                    basic: false,   // 默认true，启用一个简单的日志报告器
                    profile: false,  // 默认false，启用探查器。
                })
            ]
        }

    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('views', resolve('src/views'))
    },
}
