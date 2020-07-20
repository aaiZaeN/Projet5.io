const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { template } = require("babel-core");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    confirmOrder: path.join(__dirname, "src/confirmOrder/confirm-order.js"),
    cart: path.join(__dirname, "src/cart/cart.js"),
    products: path.join(__dirname, "src/products/products.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main", "topbar"]
    }),
    new HtmlWebpackPlugin({
      filename:"cart.html",
      template: path.join(__dirname, "./src/cart/cart.html"),
      chunks: ["cart", "topbar"]
    }),
    new HtmlWebpackPlugin({
      filename: "products.html",
      template: path.join(__dirname, "./src/products/products.html"),
      chunks: ["products", "topbar"]
    }),
    new HtmlWebpackPlugin({
      filename: "confirm-order.html",
      template: path.join(__dirname, "./src/confirmOrder/confirm-order.html"),
      chunks: ["confirmOrder", "topbar"]
    })
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    contentBase: "./dist",
    inline: true,
    port: 4000
  }
};