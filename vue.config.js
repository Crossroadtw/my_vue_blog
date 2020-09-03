module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
      // 处理markdown文件
      test: /\.md$/,
      use: [
        {
          loader: 'vue-loader',
          loader: 'markdown-loader',
          loader: 'html-loader'
        }
      ]
    }
    )
  }
}
