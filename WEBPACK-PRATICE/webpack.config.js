const path = require('path');

module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'none'
}