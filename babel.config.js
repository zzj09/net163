module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[     // 设置自动按需引入vant样式
    ['import',{
      libraryName:'vant',
      libraryDirectory:'es',
      style:true
    },'vant']
  ]
}
