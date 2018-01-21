const path = require('path');
const webpack = require('webpack');
const sharedConfig = require('./webpack.config.shared');

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: sharedConfig.rules
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      minChunks: 2,
    }),
    ...sharedConfig.plugins,
  ],
  devtool: 'cheap-module-source-map'
};
