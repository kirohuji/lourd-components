const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-actions",
    "@storybook/addon-storysource",
  ],
  webpackFinal: (config) => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["javascript", "sql"],
      })
    );
    return config;
  },
};
