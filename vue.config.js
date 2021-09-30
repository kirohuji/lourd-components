// const buildConfig = require("./build/config.build");
module.exports =
  process.env.NODE_ENV === "production" ? require("./build/config.build") : {};
