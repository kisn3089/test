"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var TerserPlugin = require("terser-webpack-plugin");

var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    age: "./src/age.js",
    winmeasure: "./src/andnoresp.js",
    iosmeasure: "./src/iosnoresp.js",
    result: "./src/norespresult.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true
  },
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: "index.html"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.svg$/,
      type: "asset/inline"
    }]
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [new HtmlWebpackPlugin({
    title: "Face Health Monitoring",
    hash: true,
    filename: "index.html",
    excludeChunks: ["age", "winmeasure", "iosmeasure", "result"],
    // entry에서 해당 리스트를 제외한 나머지
    template: "./src/index.html"
  }), new HtmlWebpackPlugin({
    title: "Face Health Monitoring",
    hash: true,
    filename: "age.html",
    chunks: ["age"],
    template: "./src/age.html"
  }), new HtmlWebpackPlugin({
    title: "Face Health Monitoring",
    hash: true,
    filename: "measure.html",
    chunks: ["winmeasure"],
    template: "./src/measure.html"
  }), new HtmlWebpackPlugin({
    title: "Face Health Monitoring",
    hash: true,
    filename: "mediapipe.html",
    chunks: ["iosmeasure"],
    template: "./src/mediapipe.html"
  }), new HtmlWebpackPlugin({
    title: "Face Health Monitoring",
    hash: true,
    filename: "result.html",
    chunks: ["result"],
    template: "./src/result.html"
  }), new MiniCssExtractPlugin({
    filename: "[name].css"
  })]
};