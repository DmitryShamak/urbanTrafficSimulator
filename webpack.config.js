var path = require('path');

var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var css = require("!css!sass!./file.scss");

module.exports = {
    entry:   "./app/index.html",
    output:  {
        path:     __dirname + "/dist",
        filename: "index.html"
    },
    module:  {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: "file-loader?name=[name].[ext]"}
        ]
    },
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: ['bower_components'],
            manifestFiles: ['bower.json', '.bower.json'],
            includes: /.*/,
            excludes: /.*\.less$/
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        }),
        new CopyWebpackPlugin([{
            from: './app/index.html', to: 'index.html'
        }, {
            from: './app/js/app.js', to: 'app.js'
        }])
    ]
};