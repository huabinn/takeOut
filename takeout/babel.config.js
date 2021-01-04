module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 如果需要按需引入第三方库，添加
  "plugins": [["component", 
    { "libraryName": "mint-ui", "style": true }
  ]]
}
