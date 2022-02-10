# ERNTemplate

Edison React Native Template

这个项目的目的是总结 donut 在实践过程中遇到的一些问题，对于常见的应用场景总结分析，并试图提炼出一套规范化的方法，便于以后 RN 项目的快速高效的开发，同时可以更进一步的去完善 donut 中不合理的的地方。

另外，这个项目中可以探索关于性能优化、打包编译、常用第三方库的最佳使用方式等等

环境搭建 https://reactnative.cn/docs/environment-setup

关于包管理工具，npm 和 yarn 都是很优秀的包管理工具，但相比 npm， 更推荐使用 yarn，使用 yarn 安装包的时候似乎更快一点。

## lint-staged

The fastest way to start using lint-staged is to run following command in your terminal: `npx mrm lint-staged`

It will install and configure husky and lint-staged depending on code quality tools from package.json dependencies so please make sure you install (npm install --save-dev) and configure all code quality tools like Prettier, ESlint prior that.

## 引入的库

### 导航

react-navigation

> https://reactnavigation.org/docs/getting-started

### 状态管理

Mobx

> https://mobx.js.org/README.html

### 网络请求

React Native Fetch

donut 项目使用的是 react native 自身提供的 fetch 方法。当然如果需要更多可定制的功能，可以使用 axios。

> https://reactnative.cn/docs/network

### 本地存储

@react-native-async-storage/async-storage

> https://github.com/react-native-async-storage/async-storage

### 手势处理、Touchable

react-native-gesture-handler
https://docs.swmansion.com/react-native-gesture-handler/docs/

注：donut 项目中的 react-native-platform-touchable is no longer maintained
推荐 https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/buttons

### 文件存取

react-native-fs

用于本地文件的创建，写入，上传，下载

### 数据库

目前 donut 使用的是 sqlite， 但使用它需要用比较原始的 sql 语句，不够方便

## 目录结构规范

```
├── README.md // [必选] 导读
├── package.json // [必选] 大家都懂
└── src
├── app.js // 纯 RN 项目根容器
    ├── assets // [可选] 资源文件, 图片、动画文件
    ├── config // [可选] 存放一些全局的配置，例如 base url
    ├── screens | pages // [必选] 页面组件，不允许有其他类型组件混入
    ├── styles/common.js // [必选] 全局样式
    ├── stores // [可选] 存放 Mobx store 文件
    ├── sharedComponents | components // [必选] 通用组件
    ├── api // [可选] 业务接口封装
    └── utils // [可选] 工具库（用于一些函数方法之类的库）
└── index.js // [必选] 纯 RN 项目入口文件，这个入口文件是为原生
```

注意 donut 的目录结构和上面这个有很大的区别。

- index.js 这个文件一般是初始化 RCTBridge 的时候用于构建 bundle URL 的入口文件。 在 donut 项目中虽然也有这个文件，但实际上我们的 veyron 原生工程没有用到（donut 项目自带的原生工程有用到）。因此这个文件也可以放在别的地方，但按惯例一般放在这里。
- app.js donut 没有这个文件，因为 donut 项目没有统一的入口

### 基本原则

**低耦合，高内聚。一个文件夹一个单独的业务逻辑，业务与业务之间低耦合，业务相关的数据、组件聚合在一个文件夹内。**

- 一个文件夹一个 Feature
- 使用帕斯卡命名法
- 一个文件只写一个 React 组件
- 组件名与文件名保持一致

## 编码规范

### Airbnb JavaScript Style Guide

> [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

> [https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)

### React render（class 组件）

- return 之前不要超过 15 行的处理逻辑，太多会影响代码可读性和性能
- 不要试图把整个页面的 UI 放在一个 render 里完成，可以写成小组件或者使用子 render
- 尽量不要使用三元表达式，即使使用也不要嵌套

### Class VS Function

- 入口组件一般以写成 class，但应视情况而定，如果这个页面不涉及状态管理，也许写成 function 的形式更合理。
- 尽量使用 function 组件，可控、无副作用
- 如果涉及过多的异步处理和状态处理，推荐使用 Class 组件

### import 书写顺序

```javascript
// 1. node "builtin" modules
import fs from 'fs';
import path from 'path';
// 2. "external" modules
import _ from 'lodash';
import chalk from 'chalk';
// 3. "internal" modules
// (if you have configured your path or webpack to handle your internal paths differently)
import foo from '~/foo';
// 4. modules from a "parent" directory
import foo from '../foo';
import qux from '../../foo/qux';
// 5. "sibling" modules from the same or a sibling's directory
import bar from './bar';
import baz from './bar/baz';
// 6. "index" of the current directory
import main from './';
// 7. "object"-imports (only available in TypeScript)
import log = console.log;
// 8. const 常量
// 9. let 变量
```

每组都会按照字母顺序排序

在使用中不用关心这个顺序， eslint 可以帮我们自动修复。

### React 类组件书写顺序（推荐）

1. optional `static` methods
1. `constructor`
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. _event handlers starting with 'handle'_ like `handleSubmit()` or `handleChangeDescription()`
1. _event handlers starting with 'on'_ like `onClickSubmit()` or `onChangeDescription()`
1. _getter methods for `render`_ like `getSelectReason()` or `getFooterContent()`
1. _optional render methods_ like `renderNavigation()` or `renderProfilePicture()`
1. `render`

### CSS 书写顺序

1. 位置属性: position, top, right, z-index, display, float
1. 自身属性: width, height, padding, margin
1. 文本属性: font, line-height, letter-spacing, color, text-align vertical-align text-wrap text-transform text-indent text-decoration  letter-spacing word-spacing white-space text-overflow 等
1. 背景边框: background, border 等
1. 其他: content、box-shadow、animation、border-radius、transform, transition 等

## 命名规范

### 命名符合语义化

命名需要符合语义化，如果函数命名，可以采用加上动词前缀：

| 动词   | 含义                     |
| ------ | ------------------------ |
| can    | 判断是否可执行某个动作   |
| has    | 判断是否含有某个值       |
| is     | 判断是否为某个值         |
| should | 判断是否应该执行某个动作 |
| get    | 获取某个值               |
| set    | 设置某个值               |

### 避免名称冗余

```javascript
// bad
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue',
};

// good
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue',
};
```

### 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

> 如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

```
// bad
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

// good
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

### 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。

```
// bad
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue

// good
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

### 组件名应该倾向于完整单词而不是缩写

```
// bad
components/
|- SdSettings.vue
|- UProfOpts.vue

// good
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

## Commit 描述规范

- `feat` 功能 `feature` 的意思，也是最常用的。当你的功能有变更的时候，都可以采用这种类型的 type
- `fix` 当然指的是 bug 修复
- `docs` 更新了文档，或者更新了注释
- `style` 代码格式调整，比如执行了 format、更改了 tab 显示等
- `refactor` 重构代码。指的是代码结构的调整，比如使用了一些设计模式重新组织了代码
- `perf` 对项目或者模块进行了性能优化。比如一些 jvm 的参数改动，把 stringbuffer 改为 stringbuilder 等
- `test` 这个简单，就是增加了单元测试和自动化相关的代码
- `build` 影响编译的一些更改，比如更改了 maven 插件、增加了 npm 的过程等
- `chore` 其他改动。比如一些注释修改或者文件清理。不影响 src 和 test 代码文件的，都可以放在这里
- `revert` 回滚了一些前面的代码

## 最佳实践 Demo

### Mobx Demo

通过一个 todo list 介绍 mobx 的基本用法

### Gallery

Fetch 网络数据、处理分页请求，react navigation 的用法

### RNFS Demo

文件的创建、写入、读取、上传

### Performance

演示耗时操作对 UI 界面的影响

在实际的使用场景中应该很少有特别耗时的操作，大部分情况下用户是无感知的，在 RN 中一般会把耗时操作放在 `InteractionManager.runAfterInteractions` 中，这样不会影响到动画的执行。

其他耗时操作需要具体情况具体分析，无法用一个统一的方案去处理所有的所以的耗时操作。

### 本地存储 LocalStorageDemo

简单封装了 @react-native-async-storage/async-storage 的方法，使得 value 可以是任意可以 JSON 化的类型

### Safearea Demo

大部分情况下 RN 的 SafeAreaView 已经够用了，但有些特殊情况需要处理，因此更好的方式是使用 react-native-safe-area-context 库

### Dark Mode

RN 已经支持 Dark 模式的的检测，不需要原生的支持了，配合 React Navigtion 和 Mobx 可以做到相对方便的处理 Dark 模式
注：目前 donut 的 Dark 模式并不完美，需要手动刷新

### 统一处理屏幕方向事件 LandscapeTablet

利用 Mobx 统一处理 Dimension change 事件

**另外，还有一个可能更优雅的方案：建立一个继承自 React.Componet 的类，来统一处理导航、颜色主题，方向处理、安卓后退键、组件卸载后更新问题等等**

### 和原生交互

- 原生跳转 RN 页面
- 原生 present RN 页面
- 原生嵌入 RN 页面
- 原生发送事件给 RN
- RN 跳转原生页面
- RN 嵌入原生原生 UI 模块
- RN 调用原生方法

## TODO

数据库

推送通知

错误监控

切换后台

本地相册：选择和裁剪和保存图片

可滑动 Tab

Swiper(用于 Onboarding)

侧滑按钮(邮件列表)

3D Touch

视频播放

语音播放

文件预览（附件）

Lottie 动画

内购

Webview

分享

...

> ReactNative 开发常用的三方模块 https://segmentfault.com/a/1190000008878128

> React Native 第三方组件之--UI类 https://www.jianshu.com/p/c7a8f115dca0

> https://github.com/FuYaoDe/react-native-app-intro

> https://github.com/react-native-component/react-native-smart-barcode

> https://github.com/ivpusic/react-native-image-crop-picker

> https://github.com/jacklam718/react-native-button-component

> https://github.com/alinz/react-native-webview-bridge

> https://github.com/mastermoo/react-native-action-button

> https://github.com/meliorence/react-native-snap-carousel

> https://github.com/beefe/react-native-actionsheet

> React-Native之微信好友、朋友圈分享、支付 https://blog.csdn.net/liu__520/article/details/52809815

> react-native-splash-screen
