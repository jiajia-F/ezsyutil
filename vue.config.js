const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true
})

//运行时需要注释掉
// module.exports={
//   publicPath: './',
// }