var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[ 'css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })

            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: 'babel-loader'

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
            excludeChunks: ['contact'],
            template: './src/index.html' // Load a custom template (ejs by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.html' // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        })
    ]
};