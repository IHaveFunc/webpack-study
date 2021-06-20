### webpack 学习与配置示例

#### 基础模块（Modules）

#### 基础插件（plugins）
- hard-source-webpack-plugin 为模块提供中间缓存步骤, 第一次花费正常时间，第二个构建将显著更快
- webpack-bundle-analyzer 显示打包文件的大小


bare: false,
          transpile: {
            presets: ['@babel/env'],
          },