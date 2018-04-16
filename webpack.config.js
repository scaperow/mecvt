module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/main.js'
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
            { test: /\.html$/, use: 'raw-loader' }

        ]
    }
};