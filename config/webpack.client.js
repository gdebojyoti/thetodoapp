var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

var sourceDirectory = path.resolve(__dirname, '../src')
var publicDirectory = path.resolve(__dirname, '../public')
var hostname = 'http://xenspaces.xyz/'

var config = {
  mode: 'development',
  entry: sourceDirectory + '/client/index.js',
  output: {
    path: publicDirectory,
    filename: 'bundle-[name].[hash:8].js',
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
      filename: 'css-[name].[hash:8].css',
      chunkFilename: 'csschunk-[name].bundle.css'
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'my-domain-cache-id',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'sw.js',
        importScripts: ['src/client/notification.js'],
        minify: true,
        navigateFallback: hostname + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
      }
    ),
    new WebpackPwaManifest({
      name: 'The Todo App',
      short_name: 'The Todo App',
      description: 'Just a todo app..',
      background_color: '#fff',
      theme_color: '#c0392b',
      'theme-color': '#c0392b',
      start_url: '/'
      // icons: [
      //   {
      //     src: path.resolve('src/images/icon.png'),
      //     sizes: [96, 128, 192, 256, 384, 512],
      //     destination: path.join('assets', 'icons')
      //   }
      // ]
    })
  ]
}

module.exports = config
