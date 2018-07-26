const webpack = require('webpack');
const path = require('path');
const resolve = require('path').resolve;
const WebpackDevServerOutput = require('webpack-dev-server-output');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js'
    },
    module: {
        rules: [{
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }, 　 {　　　　　　
                test: /\.(png|jpg|gif)$/,
                　　　　　　loader: 'url-loader?limit=8192'　　　　
            },
            {

                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new WebpackDevServerOutput({
            path: './dist',
            isDel: true
        })
    ],
    output: {
        // options related to how webpack emits results
        path: resolve(__dirname, './dist'), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "[name].js", // string
        // the filename template for entry chunks
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    }
};