const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'redsys-polite.js',
    library: "redsys-polite"
  },
  externals : {
    crypto: 'crypto'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins:[
    new webpack.BannerPlugin({
      banner: " Marc Pomar Torres - marc@faable.com \n created by Faable.com \n file:[file] "
    })
  ]
};
