const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: ['@babel/polyfill', './example/src'],
  },
  devServer: {
    port: 9000,
    stats: 'errors-only',
    contentBase: './dist',
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'example/index.html',
      chunks: ['index', 'common'],
    }),
  ],
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'common',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      nuomi: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: '[chunkHash].js',
    path: path.resolve(__dirname, './dist'),
  },
};
