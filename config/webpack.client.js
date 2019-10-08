var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var sourceDirectory = path.resolve(__dirname, '../src')
var publicDirectory = path.resolve(__dirname, '../public')

var config = {
  mode: 'development',
  entry: sourceDirectory + '/client/index.js',
  output: {
    path: publicDirectory,
    filename: 'bundle.js',
    publicPath: ''
  },
  resolve: { extensions: ['.js', '.json', '.scss'] },
  devServer: {
    // inline: true,
    port: 9876,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      title: 'The Todo App!',
      template: sourceDirectory + '/index.html',
      filename: 'index.html' // relative to root of the application
    }),
    new MiniCssExtractPlugin({
      filename: 'css-[name].css',
      chunkFilename: 'csschunk-[name].bundle.css'
    })
  ]
}

module.exports = config
