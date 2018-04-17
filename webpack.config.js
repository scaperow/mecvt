const webpack = require('webpack');
const path = require('path'); const resolve = require('path').resolve

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        vendor: './src/vendor.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            layui: path.join(__dirname, './node_modules/layui-src/build/layui.js')
        })
    ],
    module: {
        rules: [
            {
                test: /\.less$/, use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            { test: /\.html$/, use: 'raw-loader' },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "./dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "[name].js", // string
        // the filename template for entry chunks
    },

};