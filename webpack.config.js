const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/main.js',
        libraryTarget : 'var'  
    },
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
    resolve: {
        //extensions: ['', '.js', '.es6', '.vue'],
        alias: {
            //  也可以不写
            jquery: 'jquery/dist/jquery.min.js',  
        }
}
};