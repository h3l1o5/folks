const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/public/index.html`,
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test:/\.css$/,
        loader: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(sass|scss)$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg)(\?.*)?$/,
        loader: [
          'url-loader?limit=10000' /* converts images that less than 10kb into base64 */
        ]
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ],
  },

  devServer: {
    inline: true,
    port: 8000,
  },

  plugins: [
    HTMLWebpackPluginConfig,
  ],
}
