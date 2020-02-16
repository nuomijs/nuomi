const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path'

module.exports = {
  entry: {
    index: ['@babel/polyfill', './src'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    stats: 'errors-only',
    contentBase: './dist',
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
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
      nuomi: path.resolve(__dirname, '../lib'),
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
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['ie >= 9'],
                    },
                    modules: false
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: ['@babel/plugin-proposal-class-properties', 'dynamic-import-webpack'],
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[chunkHash].js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
};
