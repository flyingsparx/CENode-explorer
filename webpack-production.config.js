var webpack = require('webpack')
var config = require('./webpack.config.js');

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  })
];

module.exports = config;
