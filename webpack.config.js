const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js'],
    alias: {
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['image-webpack-loader'],
        enforce: 'pre',
      },
    ],
  },
  plugins:
    (process.env.NODE_ENV === 'production'
      ? ([
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html', filename: path.resolve(__dirname, 'index.html') }),
      ]) : [
        new webpack.SourceMapDevToolPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
      ]),
};
