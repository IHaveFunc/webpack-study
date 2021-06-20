const path = require("path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack'); // 访问内置的插件
const SpeedMeasurePlugin = require("speed-measure-webpack5-plugin");
const smp = new SpeedMeasurePlugin();

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
};

const webpackConfig = smp.wrap({
    entry: path.join(__dirname, './src/main.ts'),
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        iife: true,
        filename: "[name].js",
        clean: true,
    },
    devtool: 'source-map', // 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                sideEffects: false
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(handler),
        // new BundleAnalyzerPlugin(),
    ],
    // target: 'node',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    // 性能
    performance: {
        // 错误提示
        hints: 'warning',
    },
    // 
    optimization: {
        // 告知 webpack 去决定每个模块使用的导出内容
        // 由 optimization.usedExports 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成，
        // 在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容。
        usedExports: true,
        // 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
        // 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
        // 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
        // 当加载初始化页面时，并发请求的最大数量小于或等于 30
        splitChunks: true,
    },
});

module.exports = webpackConfig;