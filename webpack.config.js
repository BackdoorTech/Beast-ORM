const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: {
    'beast-orm': './dist/src/index.js',
    'beast-orm-test': './dist/src/test.js',
  },
  output: {
    filename: '[name].js',
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }]
  },
  devtool: "source-map"
};
