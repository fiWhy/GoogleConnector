var main = require('./main');
var root = require('../helpers/root');
var merge = require('webpack-merge');

module.exports = merge({
    resolve: {
        extensions: ['', '.ts']
    },
    output: {
        libraryTarget: 'commonjs2',
        library: true
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}, main.webpack);