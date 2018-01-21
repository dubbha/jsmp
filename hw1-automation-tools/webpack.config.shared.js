const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const rules = [
  {
    test: /\.jsx?$/,
    include: path.resolve(__dirname, 'src'),
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  },
  {
    test: /\.(ttf|eot|woff|svg|png)$/,
    use: [
      {
        loader: 'file-loader',
        query: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.tsx?$/,
    use: 'awesome-typescript-loader'
  },
  {
    test: /\.(css|sass)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        'resolve-url-loader',
        'sass-loader',
      ]
    })
  },
  {
    test: /\.txt$/,
    use: 'raw-loader',
  }
];

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: true,
    favicon: 'src/assets/react.ico',
  }),
  new ScriptExtHtmlWebpackPlugin({
    sync: 'common.js',
    defaultAttribute: 'defer'
  }),
  new ExtractTextPlugin('styles.css'),
  new webpack.ProvidePlugin({
    lodash: 'lodash',
    _: 'lodash'
  }),
];

module.exports = {
  rules,
  plugins
};
