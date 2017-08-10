var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        // path: __dirname + '/dist',//fix para webpack2
        path: path.resolve(__dirname, 'dist'),//fix para webpack2
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[ 'css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })

            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html' // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        })
    ]
};