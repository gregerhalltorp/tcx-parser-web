const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./config/paths');
const { getExtensions } = require('./config/extensions');

const isProduction = process.env.NODE_ENV === 'production';
const generateSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

const getDevTool = () => {
  if (isProduction) {
    return generateSourceMap ? 'source-map' : false;
  }

  return 'cheap-module-eval-source-map';
};

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/client/index.jsx',
  devtool: getDevTool(),
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/error/*', to: '.', flatten: true }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'bundle.js',
    chunkFilename: isProduction
      ? 'js/[name].[contenthash:8].chunk.js'
      : 'js/[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: getExtensions(),
  },
};

module.exports = config;
