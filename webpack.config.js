const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './assets/stylus/commonStyle.styl',
  output: {
    path: path.resolve(__dirname, './temp/'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'stylus-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 11', 'last 4 version'],
                }),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../assets/css/common.css',
    }),
  ],
};
