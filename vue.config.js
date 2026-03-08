const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [],
  chainWebpack: config => {
    config.module
      .rule("js")
      .exclude.add(/papaparse/)
      .end();
  }
})
