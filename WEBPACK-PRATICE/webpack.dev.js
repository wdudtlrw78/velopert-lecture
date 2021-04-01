const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = {
  mode: 'development',
  devServer: {
    historyApiFallback: {
      open: false,
      overlay: true,
      rewrites: [
        { from: /^\/subpage$/, to: 'subpage.html'},
        { from: /./, to: '404.html'}
      ]
    },
    port: 3333 
  }
};

module.exports = merge(common, config);