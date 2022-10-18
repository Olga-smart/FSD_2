const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const AutoImportPlugin = require('./src/helpers/autoImportPlugin/AutoImportPlugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    'colors-and-type': './pages/ui-kit/colors-and-type/colors-and-type.js',
    'form-elements': './pages/ui-kit/form-elements/form-elements.js',
    'cards': './pages/ui-kit/cards/cards.js',
    'headers-and-footers': './pages/ui-kit/headers-and-footers/headers-and-footers.js',
    'landing-page': './pages/site/landing-page/landing-page.js',
    'search-room': './pages/site/search-room/search-room.js',
    'room-details': './pages/site/room-details/room-details.js',
    'registration': './pages/site/registration/registration.js',
    'sign-in': './pages/site/sign-in/sign-in.js',
  },
  output: {
    filename: 'pages/[name]/[name].[contenthash].js',
    path: path.resolve(__dirname + '/build'),
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
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
      template: './pages/index.pug',
      inject: false
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/colors-and-type/colors-and-type.html',
      template: './pages/ui-kit/colors-and-type/colors-and-type.pug',
      chunks: ['colors-and-type']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/form-elements/form-elements.html',
      template: './pages/ui-kit/form-elements/form-elements.pug',
      chunks: ['form-elements']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/cards/cards.html',
      template: './pages/ui-kit/cards/cards.pug',
      chunks: ['cards']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/headers-and-footers/headers-and-footers.html',
      template: './pages/ui-kit/headers-and-footers/headers-and-footers.pug',
      chunks: ['headers-and-footers']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/landing-page/landing-page.html',
      template: './pages/site/landing-page/landing-page.pug',
      chunks: ['landing-page']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/search-room/search-room.html',
      template: './pages/site/search-room/search-room.pug',
      chunks: ['search-room']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/room-details/room-details.html',
      template: './pages/site/room-details/room-details.pug',
      chunks: ['room-details']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/registration/registration.html',
      template: './pages/site/registration/registration.pug',
      chunks: ['registration']
    }),
    new HTMLWebpackPlugin({
      filename: 'pages/sign-in/sign-in.html',
      template: './pages/site/sign-in/sign-in.pug',
      chunks: ['sign-in']
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/public/img/copy-webpack-plugin'),
          to: path.resolve(__dirname + '/build/assets')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'pages/[name]/[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new FaviconsWebpackPlugin('../public/favicon.svg'),
    new ESLintPlugin(),
    new AutoImportPlugin({
      pages: path.resolve(__dirname + '/src/pages/ui-kit'),
      components: path.resolve(__dirname + '/src/components')
    }),
    new AutoImportPlugin({
      pages: path.resolve(__dirname + '/src/pages/site'),
      components: path.resolve(__dirname + '/src/components')
    }),
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
              publicPath: '../../',
            }
          },
          'css-loader', 'resolve-url-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // <-- important for resolve-url-loader
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|ttf|woff2?)$/,
        type: 'asset/resource'
      },
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
        }
      },
    }
  },
};