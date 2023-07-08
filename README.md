## 介绍
基于vue3 + vite4 + typescript的B端管理系统起始模板，提供自动导入/路由、轻量CRUD表格组件和API接口自动生成等功能。

## 功能
- 一个文件，自动生成路由/菜单/面包屑
- Typescript支持，内置和扩展众多类型定义，文档在手可触
- 根据openapi自动生成数据类型、请求函数
- 轻量化的封装表单、CRUD表格，开箱即用
- 内置VITE插件，输出版本/打包信息，支持根据不同后缀打包
- 轻量的字典常量定义助手函数
- 常用API/组件自动导入，同时带类型提示
- 图标/样式一个类名搞定
- 遵循Conventional Changelog规范， 自动生成版本记录文档
- 内置常用VsCode代码片段和推荐扩展，提升开发效率

## 快速开始
1. 确保本地安装有如下软件，推荐最新版本。
```
git
node
pnpm
```
备注：pnpm在NodeJS v16+版本可通过 corepack enable 命令开启，低版本请通过 npm install pnpm 命令安装

2. 拉取模板
```
npx degit https://github.com/juetan/apptify-admin
```

3. 安装依赖
```
pnpm install
```

4. 启动项目，默认端口3020。
```
pnpm dev
```


## 开发文档
本仓库仅是一个起始模板，具体项目请根据需求改造。

### 路由菜单
基于 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) 插件。本项目使用`src/pages`作为路由目录，最终生成的路由仅有2级，主要是出于`<keepalive>`缓存的需要，其中：

| 说明 |
| --- |
| `src/pages`目录下以`_`开头的文件名/目录名为一级路由，如登陆页面。
| `src/pages`其他子目录或`.vue`文件为二级路由，如应用首页。

左侧菜单数据，将根据上面的二级路由自动生成，如需生成层级只需在对应目录下的index.vue文件中定义如下路由配置：
```
<route lang="json">
{
  "parentMeta": {
    // 具体属性查阅 src/types/vue-router.d.ts
  }
}
</route>
```

### 文件后缀
在 `scripts/vite/plugin.ts` 文件中，内置了一个VITE插件，主要用于输出编译信息以及根据不同文件后缀进行打包。在项目根目录下的`.env`配置文件中，可指定以下属性：
```
VITE_BUILD_TYPE = my
```
配置后，构建时将首先尝试加载`index.my.vue`文件，不存在时再加载`index.vue`。默认开发环境下为`dev`, 其他环境为`prod`，这在本地临时开发或根据微差异化打包时非常有用。

### 图标样式
基于 [UnoCSS]() 插件，可使用类似TailwindCSS的原子样式快速开发，同时默认安装`icon-park-outline`图标库，只需引用类名即可得到SVG图标。这在路由菜单等需要动态渲染时非常有用，同时所有样式类和图标类都是按需打包的，示例：
```html
<i class="text-sm icon-park-outline-home" />
```

### 接口请求
基于 [typescript-swagger-api]() 库，根据openapi结构自动生成请求接口和数据类型。生成的内容位于`src/api/service`目录下，默认包含数据类型定义、请求客户端(默认axios)和请求基类三大块内容。如需自定义生成模板，可查阅`scripts/openapi`目录下的模板内容。

生成的接口类型包含完整的入参和出参类型提示。

此外，在`src/api/instance/useRequest.ts`中还定义了一个`useRequest`函数，可对请求状态进行管理，示例：
```typescript
const userState = useRequest(api.user.getUsers)

// 返回的数据
userState.data

// 是否请求中
userState.loading

// 请求异常
userState.error
```

### 字典枚举
字典枚举可能包含多种需求，例如根据值获取标签、生成下拉框选项、根据值获取其他内容(如颜色)等。在 `src/config/defineConstants.ts` 文件中，定义了一个简易的字典枚举值助手函数，解决以上问题，且提供类型提示，示例：
```typescript
const media = defineConstants([
  {
    label: '视频',
    value: 1,
    enumKey: 'VIDEO',
    color: 'red'
  },
  {
    label: '图片',
    value: 2,
    enumeKey: 'IMAGE',
    color: 'blue'
  }
])

// enumKey
media.IMAGE // 2

// 根据value值，获取其他属性值, 第2个参数可选(默认label)
media.format(1, 'color') // red

// 获取某个属性值组成的数组
media.each('value') // [1, 2]

// 根据value值过滤数组，omit同理
media.pick(1) // [{ label: '视频', value: 1, enumKey: 'VIDEO' }]

// 原始传入defineContants的数组，可自定义操作
media.items // 可直接作为select的选项
```

### 增删改查
在`src/components`目录中，封装了`form`组件和`table`组件，主要用于普通CRUD的实现，这里演示基本的使用方法。
```html
<template>
  <Table ref="tableRef" v-bind="table" />
</template>
<script>
import { Table, useTable } from '@/components'

const table = useTable({
  // 数据源配置，可以是数组或返回对象的异步函数
  data: async(search, paging) => {
    return { data, total }
  },

  // 表格列配置
  columns: [
    {
      title: '用户名',
      dataIndex: 'name'
    }
  ],

  // 分页配置
  pagination: {
    showTotal: true,
  },

  // 查询配置，类型为useForm的入参
  search: {
    items: [
      {
        field: 'username',
        label: '用户名',
        type: 'input'
      },
    ]
  },

  // 新增表单弹窗的配置，类型为useFormModal的入参
  create: {
    title: '新增用户',
    items: [
      {
        field: 'username',
        label: '用户名',
        type: 'input'
      },
    ],
    submit: async({ model }) => {
      return api.xx(model)
    }
  },

  // 修改表单弹窗的配置，类型为useFormModal的入参
  modify: {
    title: '修改用户',
    items: [
      {
        field: 'username',
        label: '用户名',
        type: 'input'
      },
    ],
    submit: async({ model }) => {
      return api.xx(model)
    }
  }
})

</script>
```

### 自动导入
基于 [unplugin-auto-import]() 和 [unplugin-vue-components]() 插件，主要用于常用API的自动导入，例如vue和vue-router等；以及常用组件的导入，例如arco-design等。示例：
```html
<template>
  <!-- ArcoDesign组件，无需导入即可使用且有类型提示 -->
  <a-table :data="data"></a-table>
</template>
<script lang="ts">

// vue的API，无需导入即可使用且有类型提示
const data = ref([])

</script>
```
如需自定义其他API的自动导入，请查阅`vite.config.ts`文件中的配置。

### 代码片段
基于 VsCode 的 snippet 功能，在`.vscode/components.code-snippets`文件中定义了常用组件和API模板的快捷生成。所有代码片段均以`g`(generate)开头，对于快速CRUD或新建页面等非常有用，示例：
```ts
// 输入以下内容并回车
groutemeta

// 将生成如下内容
<route lang="json">
{
  "meta": {
    "order": 10020,
    "titble": "测试页面",
    "icon": "icon-park-outline-home"
  }
}
</route>
```

### 版本记录
基于 [release-it]() 库，运行`pnpm release`命令时，将根据你的选择，执行以下操作：
- 提升package.json的version版本(遵循semver语义)
- 给git打版本标签，例如 v1.0.1(同样遵循semver语义)
- 根据符合[Conventional Changelog]规范的git提交信息，在`CHANGELOG.md`文件中生成版本记录。
- 自动推送到npm/github/gitlab中

如需自定义`CHANGELOG.md`的生成模板或进行其他自定义配置，请查阅`/scripts/release`目录下的内容。

### 状态管理
基于 [pinia]() 库，具体使用查阅官方文档即可。

### 工具类库
日常开发难免用到各种工具库，但直接使用的话难免有不符合项目需求的时候。例如dayjs的本地化语言、相对时间插件等都要配置，散落在项目的各个角落并不是个好习惯。

建议在`src/plugins`进行二次封装后，再在项目中使用，不仅统一调用还便于管理，方便后续的优化升级。

本项目内置开发中常用的类库，如下：
| 库 | 说明
| --- | ---
| [lodash-es]() | 常用函数集，例如深克隆、防抖、节流等
| [axios]() | HTTP请求库
| [dayjs]() | 日期时间处理库
| [numeral]() | 数值处理库，如数值转时间、数值转文件大小等
| [nprogress]() | 进度条
| [@vueuse/core]() | 基于Vue Composition API的工具库，响应式存储数据、监听事件等

## 最后
如果你在使用过程中遇到问题，请在issue中提问。