var path = require('path');

var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var css = require("!css!sass!./file.scss");

module.exports = {
    entry:   "./app/js/app.js",
    output:  {
        path:     __dirname + "/dist",
        filename: "bundle.js"
    },
    module:  {
        loaders: [
            {  test: /\.js/, loader: 'babel', exclue: /(node_modules|bower_components)/ }
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
        }])
    ]
};