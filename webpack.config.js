const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    newtab: './src/newtab.js',
    options: './src/options.js'
  },
  output: {
    path: resolve(__dirname, 'dist/development'),
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin([
      '*.html',
      'manifest.json',
      'LICENSE',
      'images/icons/**'
    ])
  ]
}