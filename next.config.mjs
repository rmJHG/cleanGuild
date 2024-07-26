/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const nextConfig = {
  images: {
    domains: ["open.api.nexon.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [new MiniCssExtractPlugin()],
};

export default nextConfig;
