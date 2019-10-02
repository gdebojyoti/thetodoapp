var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      title: 'The Todo App!',
      template: sourceDirectory + '/index.html',
      filename: 'index.html' // relative to root of the application
    })
  ]
}

module.exports = config
