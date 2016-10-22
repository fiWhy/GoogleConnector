var webpack = require('webpack'),
    webpackConfig = require('../config/webpack.dev');
    
function run() {
    return webpack(webpackConfig, function() {
        
    });
}

run();