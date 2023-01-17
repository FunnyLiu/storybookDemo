const path = require("path");
module.exports = {
  // 设置别名
  // resolve: [
  //   {
  //     alias: {
  //       vue: "@vue/compat",
  //     },
  //   },
  // ],
  stories: [
    "../packages/storybook/stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (config, { configType }) => {
    // 在构建设置中，为 vue 设置别名 @vue/compat，且通过 Vue 编译器选项开启兼容模式。
    // config.module.rules.push({
    //   test: /\.vue$/,
    //   loader: "vue-loader",
    //   options: {
    //     compilerOptions: {
    //       compatConfig: {
    //         MODE: 2,
    //       },
    //     },
    //   },
    // });
    // 兼容scss
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    // 兼容mjs
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
  framework: "@storybook/vue3",
};
