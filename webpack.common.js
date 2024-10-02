const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    bootstrapSCSSEntry: {
      import: "./src/js/bootstrapSCSSEntry.js",
      filename: "js/bootstrapSCSSEntry.[contenthash].js",
    },
    main: {
      import: "./src/js/main.js",
      filename: "js/main.[contenthash].js",
    },
  },
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: "img/[name].[contenthash][ext][query]",
    clean: true,
  },
    optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      chunks: ["bootstrapSCSSEntry", "bootstrapJSEntry", "main"],
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/img", to: "img" },
        { from: "./src/files", to: "files" },
        { from: "./src/robots.txt", to: "robots.txt" },
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      safelist: ['lazyload', 'lazyloaded'] // Thêm các class bạn muốn giữ lại
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run postcss actions
            options: {
              postcssOptions: {
                plugins: function () {
                  // postcss plugins, can be exported to postcss.config.js
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
