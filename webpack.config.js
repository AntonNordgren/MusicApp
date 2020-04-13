'use strict'

const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'app_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(
      {
        template: "./src/index.html",
        filename: "./index.html"
      }
    )
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './api',
    hot: true,
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  node: {
    fs: "empty",
    net: 'empty',
  },
};