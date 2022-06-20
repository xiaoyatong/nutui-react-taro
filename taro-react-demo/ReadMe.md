# NutUI-React 支持 Taro 的调研

## 使用Taro创建一个React的项目
按照官方步骤即可。

1. 安装 taro cli
```
yarn add @tarojs/cli
```

2. 通过taro版本号，检验是否安装成功
```
taro -v
```
当前版本为3.4.4

3. 初始化项目
```
taro init taro-react-demo
```
这里使用 react 框架的默认模板构建，css 预处理器使用scss编译。

4. 运行你的项目
```
npm run dev:weapp
```
并在小程序的IDE下运行该项目，运行目录要指向 dist 文件夹下。

这时，demo 完毕。

## 加入 NutUI-React 元素
1. 安装内置组件的支持插件 @plugin-html
```
yarn add @tarojs/plugin-html
```
2. 配置该内置组件
config/index.js
```
config = {
  // ...
  plugins: ['@tarojs/plugin-html']
}
```
3. 添加 @nutui-react 组件库
```
yarn add @nutui/nutui-react
```

4. 在 /src/pages/index/index.tsx 下添加 nutui-react 组件，进行测试
```
import { Button } from '@nutui/nutui-react';
render () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <Button type="primary" className='btn'>主要按钮</Button>
      <Button type="info" className='btn'>信息按钮</Button>
      <Button type="default" className='btn'>默认按钮</Button>
      <Button type="danger" className='btn'>危险按钮</Button>
      <Button type="warning" className='btn'>警告按钮</Button>
      <Button type="success" className='btn'>成功按钮</Button>
    </View>
  )
}
```
5. nutui-react 样式导入
1) 因为nutui-react 使用的是 scss 预处理器，同时，支持主题定制，所以需要在配置文件里，增加对样式变量的引入。

config/index.js
```
sass:{
  data: `@import "@nutui/nutui-react/dist/styles/variables.scss";`
}
```

2) 同时，我们需要在babel配置文件里，增加 import 插件：

babel.config.js
```
plugins: [
  [
    "import",
    {
      "libraryName": "@nutui/nutui-react",
      "libraryDirectory": "dist/esm",
      "style": true,
      "camel2DashComponentName": false
    },
    'nutui-react'
  ]
]
```

记得，安装babel-plugin-import 插件。
```
yarn add babel-plugin-import
```
3) 使用pxconfig，忽略对组件库的单位的转换。
```
pxtransform: {
  config: {
    selectorBlackList: ['nut-']
  }
},
```
