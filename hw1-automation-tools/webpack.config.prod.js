const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sharedConfig = require('./webpack.config.shared');

const banner = 'Production build. Minimalism is the king.';

module.exports = {
  entry: {
    bundle: './src/index.js',
    other: './src/other.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
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
    new CaseSensitivePathsPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new CompressionPlugin({
      asset: '[path].gz',
      algorithm: 'gzip',
      test: /\.(html|js|css|svg|png)$/,
      threshold: 1024,
      minRatio: 0.95,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      minChunks: 2,
    }),
    ...sharedConfig.plugins,
  ],
  devtool: 'cheap-module-source-map'
};
