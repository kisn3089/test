const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    age: "./src/age.js",
    measure: "./src/measure.js",
    result: "./src/result.js",
    progress: "./src/util/js/progressbar.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Face Health Monitoring",
      hash: true,
      filename: "index.html",
      excludeChunks: ["age", "measure", "result"], // entry에서 해당 리스트를 제외한 나머지
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "Face Health Monitoring",
      hash: true,
      filename: "age.html",
      chunks: ["age"],
      template: "./src/age.html",
    }),
    new HtmlWebpackPlugin({
      title: "Face Health Monitoring",
      hash: true,
      filename: "measure.html",
      chunks: ["measure"],
      template: "./src/measure.html",
    }),
    new HtmlWebpackPlugin({
      title: "Face Health Monitoring",
      hash: true,
      filename: "result.html",
      chunks: ["result"],
      template: "./src/result.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
