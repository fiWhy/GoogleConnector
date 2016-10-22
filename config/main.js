var root = require('../helpers/root');
module.exports = (function() {
    var src = root('src'),
        base = root('./'),
        dist = root('dist');
    return {
        src: src,
        base: base,
        dist: dist,
        webpack: {
            entry: src + '/index.ts',
            target: 'node'
        }
    }
})();