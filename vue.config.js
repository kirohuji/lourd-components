const buildConfig = require("./build/config.build");
module.exports = process.env.NODE_ENV === "production" ? buildConfig : {};
const path = require("path");
