## 使用 Taro + NutUI-Vue 组件库 完成小程序开发
Taro是一个使用类React的语言进行开发的支持多端适配的框架。
nutui-vue 提供了对 Taro 框架的支持，即用户可以通过使用 nutui-vue 开发多端适配的小程序。简单说就是使用Vue语言+nutui-vue组件库，借住Taro的多端能力，开发出适配多端的小程序。（关注这里：babel-preset-taro，适配了vue、react、小程序等技术栈）

### 安装Taro

0. 安装命令

```
npm install @tarojs/cli
```

1. 确保使用高版本的node

Expected version "^12.22.0 || ^14.17.0 || >=16.0.0". Got "8.11.3"。

2. 检查是否安装成功

```
taro -v

Taro v3.4.4

```

### 初始化一个基于nutui-vue的项目

安装Taro后，就创建一个项目，试一试吧。
比如创建一个 nutui-vue-taro 的项目，用来测试nutui-vue组件库 可以在taro下使用。
输入命令后，按照指引选择 vue3、ts、sass、gitee下的模板来源、vue3-nutui 模板。
Taro 会按照你选择的参数，创建项目，并对项目进行初始化。
```
taro init nutui-vue-taro
```

初始化成功后，就可以运行一下demo了，执行一个可以给微信小程序用的demo：
```
yarn dev:weapp
```

如果想给飞书小程序用，就执行这个方法：
```
yarn dev:lark
```

更多的有：yarn dev:jd等。

### vue3-nutui模板都做了什么？

我们可以看到，在初始化成功后的项目的package.json里，有nutui-vue相关的npm包的安装，包含nutui自身和vue相关。
比如：@nutui/nutui-taro、vue、vue-loader、@vue/compiler-sfc、eslint-plugin-vue；
@tarojs/plugin-framework-vue3；
同时，我们也看到，相比使用react的默认模板来构建的项目，还多了一些其他的依赖：@tarojs/plugin-html。

而如果使用react构建的项目，会多一些对react的依赖。


### 不使用模板时，怎么做？

所以，当我们使用非模板方式时，我们可以采用以下方式：可单独安装 nutui-taro npm包。方式如下：

安装nutui-taro包
```
yarn add @nutui/nutui-taro
```

安装plugin-html包
```
yarn add @tarojs/plugin-html
```

在项目中配置，这里增加了对plugin的支持，同时增加了对主题定制的支持；顺便处理了nutui vue 以375为标准的兼容。
```
// config/index.js
config = {
  // ...
  plugins: ['@tarojs/plugin-html']
  // 给 sass-loader 传递选项 ！！！！ 按需加载方式必须配置
  sass: {
      data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  }
}

// config/index.js
config = {
  // ...
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  }
}
```

### nutui-taro为此做了什么呢？
首先，taro为了支持vue 做了什么呢？
1. 为了方便开发者在vue框架上开发，taro在组件、api和路由等规范上，增加了对小程序规范的处理。
如下：

1）依赖包：@tarojs/plugin-framework-vue3
使用vue3，需要安装此npm包。

2）入口组件和页面组件，分别对应小程序的入口组件app和页面组件page。
一个taro应用由一个入口组件和至少一个页面组件组成，这样才可以符合小程序的规范。

3）内置组件
Taro v3.3+，支持使用H5标签开发，这个就是最有意思的部分，也是web组件库可以顺利迁移到小程序端的媒介。
Taro 中可以使用小程序规范的内置组件进行开发，如 <View>、<Text>、<Button> 等。


4）Taro规范
- 在 React 中使用这些内置组件前，必须从 @tarojs/components 进行引入。
- 组件属性遵从大驼峰式命名规范。

来个demo：

```
import { Swiper, SwiperItem } from '@tarojs/components'

function Index () {
  return (
    <Swiper
      className='box'
      autoplay
      interval={1000}
      indicatorColor='#999'
      onClick={() => {}}
      onAnimationFinish={() => {}}
    >
      <SwiperItem>
        <View className='text'>1</View>
      </SwiperItem>
      <SwiperItem>
        <View className='text'>2</View>
      </SwiperItem>
      <SwiperItem>
        <View className='text'>3</View>
      </SwiperItem>
    </Swiper>
  )
}
```

5）事件


### plugin-html：做了什么？

更多原文信息，查看这里：
https://taro-docs.jd.com/taro/docs/use-h5/


#### 使用方法：
安装插件：
```
yarn add @tarojs/plugin-html
```
配置插件

```
// config/index.js
config = {
  // ...
  plugins: ['@tarojs/plugin-html']
}
```

#### 插件的配置项
1. pxtransformBlackList
```
config = {
  plugins: [
    ['@tarojs/plugin-html', {
      // 包含 `demo-`、`van-` 的类名选择器中的 px 单位不会被解析
      pxtransformBlackList: [/demo-/, /van-/]
    }]
  ]
}
```

2. modifyElements
修改普通块级元素和行内元素的映射规则。

```
config = {
  plugins: [
    ['@tarojs/plugin-html', {
      modifyElements (inline: string[], block: string[]) {
        // 行内元素增加 <xxx>
        inline.push('xxx')
        // 行内元素添加 <span>，块级元素删除 <span>
        inline.push('span')
        block.splice(block.indexOf('span'), 1)
      }
    }]
  ]
}
```

3. enableSizeAPIs
设置是否能够使用 H5 同步获取元素尺寸的 API 的 异步版本，如 getBoundingClientRect。
```
config = {
  plugins: [
    ['@tarojs/plugin-html', {
      // 这些异步 API 的代码将会从运行时代码中删除，默认值为 true
      enableSizeAPIs: false
    }]
  ]
}
```
4. postcss 配置项
@tarojs/plugin-html 会启用 postcss 插件：postcss-html-transform 对样式进行一些处理，例如去除 \* 选择符等。以下是 postcss-html-transform 的一些配置项：

removeCursorStyle

```
config = {
  // ...
  mini: {
    // ...
    postcss: {
      htmltransform: {
        enable: true,
        // 设置是否去除 cursor 相关样式。默认值为true
        removeCursorStyle: false
      }
    }
  }
}
```


#### 样式相关问题：重点关注

1. 样式相关：
```
// 直接在app.js 中引用html5的css文件。
import '@tarojs/taro/html5.css';
```

2. 【重点关注】：设计稿及尺寸单位。
Taro默认会使用 postcss 把px按比例解析为rpx。
但三方h5组件库不需要解析px单位，用户可以配置 @tarojs/plugin-html 插件中的 pxtransformBlackList 选项进行过滤。
```
config = {
  plugins: [
    ['@tarojs/plugin-html', {
      // 包含 `demo-`、`van-` 的类名选择器中的 px 单位不会被解析
      pxtransformBlackList: [/demo-/, /van-/]
    }]
  ]
}
```
3. <span>默认表现为块级样式【重点关注】
这时的span，兼容了很多h5的标签写法，但是也同样给开发者带来困扰。本来想用来表示行内元素的部分，需要特别指出其样式为 inline；或者引入全套的浏览器默认样式。

至于 <i> 等行内标签还是默认映射为 <Text>。如果需要修改映射规则，可以配置 @tarojs/plugin-html 插件的 modifyElements 选项。

抱歉，有些css选择器不支持。比如通配符*，媒体查询，属性选择器（当属性不是对应小程序组件的内置属性时）。
而这些，都是我们在支持taro开发的时候，要跟进的事情。

4. 不支持rem。【check】

5. 表单组件。差异较大。【关注】

- 在使用 <input type='checkbox'> 或 <input type='radio'> 时，需要手动补充 <CheckboxGroup>、<RadioGroup> 组件。
- HTML 使用 <select> + <option> 实现选择器，而小程序使用 <Picker>。两者差异巨大，因此不作映射。当用户使用了 <select> 时，会提示用户直接使用 <Picker> 组件。


6. 不能同步获取元素尺寸。【关注】
```
// h5
const el = document.getElementById('#inner')
const res = el.getBoundingClientRect()
console.log(res)
```

```
// mp
const query = Taro.createSelectorQuery()
query.select('#inner')
  .boundingClientRect()
  .exec(res => {
    console.log(res)
  })
```

所以 taro 支持了一些api：【更多api去这里 todo】
```
const el = document.getElementById('#inner')
const res = await el.getBoundingClientRect()
console.log(res)

```
7. DOM API 差异

像canvas、video、audio 这类元素，需要注意：

```
// h5
const el = document.getElementById('myVideo')
el.play()

```

在小程序里需要调用组件的原生方法，需创建 Context

```
const ctx = Taro.createVideoContext('myVideo')
ctx.play()

```

8. <img> 图片尺寸问题
h5中，如果不设置宽高，浏览器会使用原图的宽高作为标签的宽高；在小程序里，不设置image标签的宽高时，会使用默认样式中规定的宽高。
所以，在使用img标签时，必须显式设置它的宽高。

9. 不支持ReactDOM 部分API
Taro使用 React Reconciler 实现了自定义的渲染器，相对于 ReactDOM 来说，功能很精简。
因此，基于 ReactDOM 实现的 h5 组件会无法使用，比如 unstable_renderSubtreeIntoContainer。

10. 不支持 React Portal
11. 不支持 Vue3 Teleport
12. 暂不支持使用 SVG










#### Taro 开发的其他注意点

1. 路由配置
```
import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from 'react'

export default class Index extends Component {
  componentDidMount () {
    console.log(getCurrentInstance().router.params)
  }
}
```
2. 接口请求的封装
```
const options = {
  method: requestType, // "GET"或者"POST"
  url,
  data: param,
  credentials: "include" as credentialsType,
  timeout: 1000 * 30,
  header: h,
};
const res = await Taro.request(options)
```

#### Taro 开发的小程序和原生小程序的混搭
Taro3 官方提供了混合开发的功能，可以让原生小程序项目和打包出来的项目进行混合开发使用，通过--blended 命令。
在打包出来的 app.js 中会暴露出 taroApp，供我们在原生小程序的 app.js 页面下去调用其生命周期。

```
taro build --type weapp --blended
```
存在这样一个问题，在执行我们的原生小程序项目时，我们通过引用在原生项目下的 app.js 里引入 Taro 项目的入口文件，来提前初始化一些运行时的逻辑，因此要保证 Taro 项目下的 app.js 文件里的逻辑能优先执行。所以说只是--blended 命令这种，只适合主包的页面，分包的话，没法优先执行。


### 使用 Taro + NutUI-React 组件库 完成小程序开发
1. 