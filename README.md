# ERNTemplate

Edison React Native Template

环境搭建 https://reactnative.cn/docs/environment-setup

关于包管理工具，npm 和 yarn 都是很优秀的包管理工具，但相比 npm， 更推荐使用 yarn，使用 yarn 安装包的时候似乎更快一点。

## lint-staged

The fastest way to start using lint-staged is to run following command in your terminal:

`npx mrm lint-staged`

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

TODO 添加例子

## 编码规范

### Airbnb JavaScript Style Guide

> [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

> [https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)

### React render

- 不要写大量的处理逻辑，影响代码可读性和性能
- 不要试图把整个页面的 UI 放在一个 render 里完成，可以写成小组件或者使用子 render
- 尽量不要使用三元表达式，即使使用也不要嵌套

### Class VS Function

- 入口组件一般以写成 class，但应视情况而定，如果这个页面不涉及状态管理，也许写成 function 的形式更合理。
- 尽量使用 function 组件，可控、无副作用

### 统一处理屏幕方向事件

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

### React 类组件书写顺序

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

## 最佳实践

这个项目中可以探索关于性能优化、打包编译、第三方库的最佳使用方式等等

UI 适配最佳实践

React Navigation 最佳实践

- 怎样传递参数
- 动态设置导航
- 导航和组件通信
- ...

Mobx 最佳实践

Realm 最佳实践

处理 Warning: Can't perform a React state update on an unmounted component
...

## TODO

- 跟 Native 无数据交互
  - 单纯静态展示页面。
  - 直接从网络获取数据。
- RN 单向从 Native 获取数据
  - 启动的时候 Native 通过参数传递变量
  - RN 通过 API 读取 Native 的数据
- RN 调用 Native
  - 不回调，可以做成同回调一次一样，因为 RN 调用 Native 本身都是异步的。
  - 回调一次，可以使用 RN 原生的 Callback
  - 回调多次，原生不支持，必须使用 Event 方式。
- Native 主动调用 RN
  - 通过 Event Emit RN
  - 通过 Headless Service（Android）。
- RN 页面需要存储数据
  - 存储数据库
  - 存储 Preference
- RN 底层对应的 Native Page
  - Full Page，全页面都是 RN
  - 有本地导航栏的页面，导航栏风格保持跟 Native 一致
  - Dialog 风格
- RN 页面跳转

  - 纯粹在 RN 层面跳转
  - 依托 Native 页面导航
