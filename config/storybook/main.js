const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["javascript", "sql"],
      })
    );
    config.module.rules.push({
      resourceQuery: /blockType=docs/,
      use: [
        "storybook-readme/vue/docs-loader",
        "html-loader",
        "markdown-loader",
      ],
    });
    return config;
  },
};
