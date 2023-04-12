const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const AutoImportPlugin = require('./autoImportPlugin/AutoImportPlugin');

const isDev = process.env.NODE_ENV === 'development';

const uiKitPages = [
  'colors-and-type',
  'form-elements',
  'cards',
  'headers-and-footers'
];

const websitePages = [
  'landing-page',
  'search-room',
  'room-details',
  'registration',
  'sign-in'
];

const getEntryPoints = () => {
  const entryPoints = {};

  uiKitPages.forEach((page) => {
    entryPoints[page] = `./pages/ui-kit/${page}/${page}.js`
  });

  websitePages.forEach((page) => {
    entryPoints[page] = `./pages/site/${page}/${page}.js`
  });

  return entryPoints;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: getEntryPoints(),
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
    ...uiKitPages.map((page) => 
      new HTMLWebpackPlugin({
        filename: `pages/${page}/${page}.html`,
        template: `./pages/ui-kit/${page}/${page}.pug`,
        chunks: [page]
      })
    ),
    ...websitePages.map((page) => 
      new HTMLWebpackPlugin({
        filename: `pages/${page}/${page}.html`,
        template: `./pages/site/${page}/${page}.pug`,
        chunks: [page]
      })
    ),
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
    ...['ui-kit', 'site'].map((dir) => 
      new AutoImportPlugin({
        pages: path.resolve(__dirname + `/src/pages/${dir}`),
        components: path.resolve(__dirname + '/src/components')
      })
    ),
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