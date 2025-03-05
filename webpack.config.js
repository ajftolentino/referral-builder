/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
require('dotenv').config();
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true, // Cleans output directory before each build
  },
  resolve: {
    alias: {
      appConstants: path.resolve(__dirname, 'src/constants/'),
      common: path.resolve(__dirname, 'src/common/'),
      components: path.resolve(__dirname, 'src/components/'),
      config: path.resolve(__dirname, 'src/config/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      services: path.resolve(__dirname, 'src/services/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      store: path.resolve(__dirname, 'src/store/'),
      types: path.resolve(__dirname, 'src/types/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/, // Matches .js, .jsx, .ts, .tsx files,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Resolves CSS imports and URLs
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          }, // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      inject: 'body',
      links: [
        { rel: 'manifest', href: '/manifest.json' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'android-chrome-192x192',
          sizes: '192x192',
          href: 'android-chrome-192x192.png',
        },
        {
          src: 'android-chrome-512x512',
          sizes: '512x512',
          href: 'android-chrome-512x512.png',
        },
      ],
      meta: {
        viewport:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1',
        description: 'Referral Builder | Build Your Referrals!',
        'theme-color': '#ffffff',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'mobile-web-app-capable': 'yes',
      },
      template: './public/index.html', // Path to your HTML template
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/manifest.json', to: './' },
        { from: './public/apple-touch-icon.png', to: './' },
        { from: './public/android-chrome-192x192.png', to: './' },
        { from: './public/android-chrome-512x512.png', to: './' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css', // Output CSS files
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  optimization: {
    minimizer: [
      `...`, // Extend Webpack defaults
      new CssMinimizerPlugin(), // Minifies CSS
    ],
    minimize: true, // Minifies JS & CSS
    splitChunks: {
      chunks: 'all', // Code-splitting for better caching
    },
  },
  devtool: 'source-map', // Optional: Enables source maps
  devServer: {
    port: 3001, // Port where the app will be served
    historyApiFallback: true, // Prevents the "Cannot GET /" error for single-page apps
    static: './dist',
    hot: true, // Enables hot module replacement
  },
};
