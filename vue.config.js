const path = require("path");
const webpack = require("webpack");
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
                target: 'https://www.fastmock.site/mock/8b8187de5502cc6a522b78638621c2c4/HuiAdmin/',
                pathRewrite: { '^/dev-api': '' }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('views', resolve('src/views'))
    },
}
