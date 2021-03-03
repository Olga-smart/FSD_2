const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    'colors-and-type': './ui-kit/colors-and-type/colors-and-type.js',
    'form-elements': './ui-kit/form-elements/form-elements.js',
    'cards': './ui-kit/cards/cards.js',
    'headers-and-footers': './ui-kit/headers-and-footers/headers-and-footers.js',
    'landing-page': './pages/landing-page/landing-page.js',
    'search-room': './pages/search-room/search-room.js',
    'room-details': './pages/room-details/room-details.js',
    'registration': './pages/registration/registration.js',
    'sign-in': './pages/sign-in/sign-in.js',
  },
  output: {
    filename: 'pages/[name]/[name].[contenthash].js',
    path: path.resolve(__dirname + '/docs'),
    assetModuleFilename: 'assets/[name].[contenthash][ext]'
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.pug',
      inject: false
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/colors-and-type/colors-and-type.html',
      template: './ui-kit/colors-and-type/colors-and-type.pug',
      chunks: ['colors-and-type']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/form-elements/form-elements.html',
      template: './ui-kit/form-elements/form-elements.pug',
      chunks: ['form-elements']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/cards/cards.html',
      template: './ui-kit/cards/cards.pug',
      chunks: ['cards']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/headers-and-footers/headers-and-footers.html',
      template: './ui-kit/headers-and-footers/headers-and-footers.pug',
      chunks: ['headers-and-footers']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/landing-page/landing-page.html',
      template: './pages/landing-page/landing-page.pug',
      chunks: ['landing-page']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/search-room/search-room.html',
      template: './pages/search-room/search-room.pug',
      chunks: ['search-room']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/room-details/room-details.html',
      template: './pages/room-details/room-details.pug',
      chunks: ['room-details']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/registration/registration.html',
      template: './pages/registration/registration.pug',
      chunks: ['registration']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/sign-in/sign-in.html',
      template: './pages/sign-in/sign-in.pug',
      chunks: ['sign-in']
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './img/room*.jpg',
          to: path.resolve(__dirname + '/docs')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'pages/[name]/[name].[contenthash].css'
    }),
    new FaviconsWebpackPlugin('theme/favicon.svg'),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: isDev
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader', 'resolve-url-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|ttf|woff)$/,
        type: 'asset/resource'
      }
    ] 
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
     },
   },
};