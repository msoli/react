var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path");

var isProd = process.env.NODE_ENV === 'production' ;// true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use:[ 'css-loader', 'sass-loader'],
    publicPath: '/'
});
var cssConfig = isProd ? cssProd : cssDev;
console.log(isProd);

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        // path: __dirname + '/dist',//fix para webpack2
        path: path.resolve(__dirname, 'dist'),//fix para webpack2
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig

            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: 'babel-loader'

            },
            {
                test: /\.(jpe?g|jpg|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512.[ext]&outputPath=images/',
                    'image-webpack-loader'
                ]

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
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            // filename: './../index.html',
            template: './src/index.html' // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        })
    ]
};