/** @format */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: 'postcss.config.js'
    }
  }
}

const isProduction = process.env.NODE.ENV
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      // filename.module.scss => css modules, // filename.scss => global
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              'sass-loader'
            ],
          }, {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
              postcssLoader,
            ]
          }
        ],
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
      {
        test: /\.(png | jpe?g | gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (!isProduction) {
                  return '[path][name].[ext]';
                }
                return '[contenthash].[ext]';
              },
              publicPath: 'assets/',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        // data:mediatype;base64, data -> 데이터 url 형태로된 문자열로 반환된다.
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader', // url - loader 이점 : 리소스 요청수를 줄일 수 있다.
            // 문자열 형태로 변경되어서 바로 문서 내부에 적용되기 때문에 문서의 크기는 커질 수 있으나 이미지가 아주 작은사이즈들을 다룰경우에는 문자열로 변환된 값이 크게 부담이 되진 않기 때문에 문서를 다운받는 시간에 영향을 주진 않고 반면에 리소스 요청 수 가 줄기 때문에 중요한 파일들을 빨리 불러올 수 있다.
            options: {
              limit: 8192, // 파일크기의 제한 8kb까지 적용
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: './template.hbs',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: true,
    }),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
