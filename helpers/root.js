var path = require('path');
module.exports = function() {
    var nodes = Array.prototype.slice.call(arguments);
    var baseDir = path.join(__dirname, '../');

    return path.join.apply(path, [baseDir].concat(nodes));
}