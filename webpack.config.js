const path = require('path'); // CommonJS

module.exports = {
  mode: 'development',
  entry: './frontend/blog-main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'blog-bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }]
  },
  devtool: 'source-map'
};
