const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: ['@babel/polyfill', './test'],
  },
  devServer: {
    port: 9000,
    contentBase: './dist',
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['index', 'common'],
    }),
  ],
  mode: process.env.NODE_ENV,
  // devtool: 'eval-source-map',
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
      nuomi: path.resolve(__dirname, 'src'),
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
