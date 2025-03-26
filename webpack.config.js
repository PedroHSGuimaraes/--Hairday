const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyWebPackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    open: true,
    liveReload: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: path.resolve(__dirname, "src", "assets", "scissors.svg"),
    }),
    new copyWebPackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src", "assets"), to: path.resolve(__dirname, "dist","src", "assets") },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
