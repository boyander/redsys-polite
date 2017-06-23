const webpack = require('webpack');
const path = require('path');
var PACKAGE = require('./package.json');
var banner = PACKAGE.name + ' - ' + PACKAGE.version;

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'redsys-polite.js',
    libraryTarget:"umd"
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  plugins:[
    new webpack.BannerPlugin({
      banner: ` ${banner}\n Marc Pomar Torres - marc@faable.com \n created by Faable.com \n file:[file] `
    })
  ]
};
