const path = require('path');

module.exports = {
    entry: './client/home.js',
    mode: 'development',
    watchOptions: {
        aggregateTimeout: 200
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js'
    }
}