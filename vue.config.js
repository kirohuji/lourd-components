"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    config.module
      .rule("thejs")
      .test(/\.js$/)
      .include.add(path.resolve("src"))
      .add(path.resolve("node_modules/element-ui/packages"))
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .end();
  },
};
