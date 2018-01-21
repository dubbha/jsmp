const path = require('path');
const webpack = require('webpack');
const sharedConfig = require('./webpack.config.shared');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    port: 3001,
    watchContentBase: false,
    historyApiFallback: true,
  },
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
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    ...sharedConfig.plugins,
  ]
};
