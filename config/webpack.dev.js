var main = require('./main');
var webpackConfig = require('./webpack');
var merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
    output: {
        path: main.dist,
        filename: 'index.js'
    },
    watch: true
});