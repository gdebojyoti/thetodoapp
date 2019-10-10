var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

var sourceDirectory = path.resolve(__dirname, '../src')
var buildDirectory = path.resolve(__dirname, '../build')
var hostname = 'http://xenspaces.xyz/'

var config = {
  target: 'node',
  mode: 'development',
  entry: sourceDirectory + '/server/index.js',
  output: {
    path: buildDirectory,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss']
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
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'thetodoapp-cache-id',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'sw.js',
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
    })
  ]
}

module.exports = config
