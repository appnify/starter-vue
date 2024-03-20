## 介绍

基于 vue3 + vite + typescript 的 B 端管理后台模板，提供路由自动生成、轻量 CRUD 表格组件和 API 接口自动生成等功能。

## 功能

- 📁 路由基于文件系统自动生成，自由扩展路由元信息/菜单项/面包屑
- ✨ 使用 Typescript 编写，内置和扩展众多类型定义，文档在手可触
- 🖼  支持 Openapi/Swagger 接口生成，按模块
- 🎟  包含增强的表单/表格组件库，简化增删改查开发。
- 🎊 包含内置 Vite 插件，输出打包信息和基于后缀的条件加载
- 🎉 轻量的字典常量定义助手函数
- 🎁 支持常用 API/组件自动导入，同时带类型提示
- 🎨 图标/样式一个类名搞定
- 🎑 遵循 Conventional Changelog 规范， 自动生成版本记录文档
- ✨ 内置常用 VsCode 代码片段和推荐扩展，提升开发效率
- 🧵 支持路由动态打包、路由权限、路由缓存和动态首页
- 🛶 支持 Docker 部署，包含优化过的 Dockerfile 配置

## 快速开始

1. 确保本地安装有如下软件(推荐最新版本)。

```bash
# 提示：Pnpm 在 NodeJS v16+ 版本可通过 corepack enable 命令开启，低版本请通过 npm install pnpm 命令安装。
git           # 地址：https://git-scm.com/
node + pnpm   # 地址：https://nodejs.org/en
```

2. 拉取模板

```
npx degit https://github.com/appnify/starter-vue
```

3. 安装依赖

```
pnpm install
```

4. 启动项目，默认 3020 端口。

```
pnpm dev
```

## 使用文档

本仓库仅是一个起始模板，具体项目请根据需求改造。

### 路由菜单

基于 [unplugin-vue-router](https://github.com/hannoeru/vite-plugin-pages) 插件，做了一些改造和优化。在 src/pages 目录下，每个 .vue 文件视为一个路由，文件内可以使用 definePage() 或 \<route\> 块定义路由信息，例如：

```html
<template> .... </template>

<!-- 方式1：使用编译宏-->
<script setup>
  definePage({
    name: 'xx',
    meta: {},
  });
</script>

<!-- 方式2：使用 route 块-->
<route type="json"> { "meta": { "title": "xx", } } </route>
```

其中，meta 属性支持很多参数，如下：

````ts
interface RouteMeta {
  /**
   * 页面标题
   * @description
   * 菜单和导航面包屑等地方会用到
   */
  title?: string;
  /**
   * 页面图标
   * @description
   * 使用 icon-park-outline 图标集的图标类名
   */
  icon?: string;
  /**
   * 显示顺序
   * @description
   * 在菜单中的显示顺序，越小越靠前
   */
  sort?: number;
  /**
   * 是否隐藏
   * @description
   * - false  // 不隐藏(默认)
   * - true   // 在路由和菜单中隐藏，即忽略且不打包
   * - 'menu' // 在菜单中隐藏，通过其他方式访问
   * - 'prod' // 在生产环境下隐藏
   */
  hide?: boolean | 'menu' | 'prod';
  /**
   * 所需权限
   * @example
   * ```js
   * ['system:user']
   * ```
   */
  auth?: string[];
  /**
   * 是否缓存
   * @description
   * 是否使用 keep-alive 缓存
   */
  cache?: boolean;
  /**
   * 组件名字
   * @description
   * 组件名字，当 cache为true 时必须
   */
  name?: string;
  /**
   * 是否显示loading
   * @description
   * 可以自定义 loading 文本
   */
  loading?: boolean | string;
  /**
   * 链接
   * @description
   * ```js
   * 'https://juetan.cn'
   * ```
   */
  link?: string;
}
````

### 路由布局

在嵌套路由中，如果不需要嵌套布局，可以在 meta 中设置 component 为 null，这样就不会渲染布局组件了。

```jsonc
{
  "component": null,
  "meta": {}
}
```

这样，其层级仅作为菜单层级，在路由上表现为扁平。

### 路由权限

在路由信息中，可以指定 meta.auth 属性来定义访问该页面所需的权限，示例如下：

```jsonc
{
  "meta": {
    "auth": ["system:user", "system:menu"]
  }
}
```

默认全部需要登陆才可访问，其中有 2 个比较特殊的权限：

- `*` 表示无需登陆即可访问，适合挂一些比较通用的页面。
- `unlogin` 表示未登录才可以访问。例如登录页，登陆后访问该页面会被拒绝。

用户登陆后获取的权限，应存储在 userStore.auth 字段中，在路由的 beforeEach 守卫中，会比较两个是否匹配，匹配上则继续，否则会显示 403 页面。

### 动态路由

默认是静态路由，如需动态路由，在 src/router/guardAuth.ts 文件中获取接口，转换为菜单列表，再根据菜单中的 name 属性找到对应路由，挂载即可。

### 动态首页

在作为首页路由的 index.vue 文件中，指定 alias 为 '/' 即可，默认是 home/index.vue 文件。如需动态更新首页，在 beforeEach 获取完菜单信息，通过 removeRoute 移除旧的首页路由，通过 addRoute 添加新的首页路由即可。

### 路由缓存

在路由的 index.vue 文件，首先指定好组件的名字，再通过 cache 字段开启缓存，示例如下：

```html
<script>
  defineOptions({
    name: 'MyPage',
  });
</script>
<route> { "meta": { // 组件名字 "name": "MyPage", // 开启缓存 "cache": true } } </route>
```

### 条件加载

基于 [plugin](./scripts/vite/plugin.ts) 内置 VITE 插件，主要用于输出编译信息以及根据不同文件后缀进行打包。在项目根目录下的 .env 配置文件中，可指定以下属性：

```
VITE_EXTENSION = my
```

配置后，构建时将首先尝试加载 index.my.vue 文件，不存在时回退至 index.vue 文件。默认开发环境下为 dev, 其他环境为 prod，这在本地临时开发或根据微差异化打包时非常有用。

### 图标样式

基于 [UnoCSS]() 插件，可使用类似 TailwindCSS 的原子样式快速开发，同时默认安装 icon-park-outline 图标库，只需引用类名即可得到 SVG 图标。这在路由菜单等需要动态渲染时非常有用，同时所有样式类和图标类都是按需打包的，示例：

```html
<i class="text-sm icon-park-outline-home" />
```

### 接口请求

基于 [typescript-swagger-api]() 库，根据 openapi 结构自动生成请求接口和数据类型。生成的内容位于 src/api/service 目录下，包含以下内容:

- 请求数据类型(typescript)
- 请求客户端(axios/fetch, 默认 axios)
- 请求基类(对象)。

如需自定义生成模板，可查阅 scripts/openapi 目录下的模板内容。生成的接口类型包含完整的入参和出参类型提示。

此外，在 src/api/instance/useRequest.ts 文件中还定义了一个 useRequest 函数，可对请求状态进行管理，示例：

```typescript
const state = useRequest(api.user.getUsers);

// 返回的数据
state.data;

// 是否请求中
state.loading;

// 请求异常
state.error;
```

### 字典枚举

字典枚举可能包含多种需求，例如根据值获取标签、生成下拉框选项、根据值获取其他内容(如颜色)等。在 src/utils/defineConstants.ts 文件中，定义了一个简易的字典枚举值助手函数，解决以上问题，且提供类型提示，示例如下：

```typescript
enum MediaEnum {
  VIDEO = 1,
  IMAGE = 2,
}

const media = defineConstants([
  {
    value: MediaEnum.VIDEO,
    label: '视频',
    color: 'red',
  },
  {
    value: MediaEnum.IMAGE,
    label: '图片',
    color: 'blue',
  },
]);

// 根据value值，获取其他属性值, 第2个参数可选(默认label)
media.fmt(1); // 视频

// 获取某个属性值组成的数组，默认value
media.val(); // [1, 2]
```

### 增删改查

在 src/components 目录中，封装有 form 组件和 table 组件，主要用于 CRUD 的常规操作，这里演示基本的使用方法。

```html
<template>
  <MyTable />
</template>
<script>
  import { useTable } from '@/components';

  const MyTable = useTable({
    // 数据源配置，可以是数组或返回对象的异步函数
    data: async (search, paging) => {
      return { data, total };
    },

    // 表格列配置
    columns: [
      {
        title: '用户名',
        dataIndex: 'name',
      },
    ],

    // 分页配置
    pagination: {
      showTotal: true,
    },

    // 查询配置，类型为useForm的入参
    search: [
      {
        field: 'username',
        label: '用户名',
        type: 'input',
      },
    ],

    // 新增表单弹窗的配置，类型为useFormModal的入参
    create: {
      modalProps: {
        title: '新增用户',
        width: 500,
      },
      items: [
        {
          field: 'username',
          label: '用户名',
          type: 'input',
        },
      ],
      submit: async (model) => {
        return api.xx(model);
      },
    },

    // 修改表单弹窗的配置，类型为useFormModal的入参
    modify: {
      extend: true,
      submit: async (model) => {
        return api.xx(model);
      },
    },
  });
</script>
```

提示：以上每个参数都有类型提示，原组件每个参数都可透传，封装遵循扩展而非限制原则。

### 自动导入

基于 [unplugin-auto-import]() 和 [unplugin-vue-components]() 插件，主要用于 vue 等常用 API 的自动导入；以及 arco-design 等常用组件的导入，示例如下：

```html
<template>
  <!-- ArcoDesign组件，无需导入即可使用且有类型提示 -->
  <a-table :data="data"></a-table>
</template>

<script lang="ts">
  // vue的API，无需导入即可使用且有类型提示
  const data = ref([]);
</script>
```

如需自定义其他 API 的自动导入，请查阅`vite.config.ts`文件中的配置。

### 代码片段

基于 VsCode 的 snippet 功能，在 .vscode/components.code-snippets 文件中定义有常用组件和 API 的模板。所有代码片段均以 g(generate) 开头，对于快速 CRUD 或新建页面等非常有用，示例：

1. 在文件内，如输入如下内容并回车：

```bash
groutemeta
```

2. 将会生成如下的内容：

```
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

基于 [release-it]() 库，运行 pnpm release 命令时，将根据你的选择执行各种操作，如需自定义 CHANGELOG.md 的生成模板或进行其他自定义配置，请查阅 /scripts/release 目录下的内容。包含功能如下：

- 提升 package.json 的 version 字段
- 给 git 打版本标签，例如 v1.0.1
- 根据符合 [Conventional Changelog]() 规范的 git 提交信息，在`CHANGELOG.md`文件中生成版本记录。
- 自动推送到 npm/github/gitlab 中

### 状态管理

基于 [pinia]() 库，使用 [pinia-plugin-persistedstate]() 插件持久化部分应用配置。需要注意的是，useXxStore 不能在 app.use(store) 之前调用，否则插件会失效。

### 工具类库

日常开发难免用到各种工具库，但直接使用的话难免有不符合项目需求的时候。例如 dayjs 的本地化语言、相对时间插件等都要配置，散落在项目的各个角落并不是个好习惯。

建议在 src/libs 进行二次封装后，再在项目中使用，不仅统一调用还便于管理，方便后续的优化升级。本项目内置开发中常用的类库，如下：

| 库               | 说明                                                          |
| ---------------- | ------------------------------------------------------------- |
| [lodash-es]()    | 常用函数集，例如深克隆、防抖、节流等                          |
| [axios]()        | HTTP 请求库                                                   |
| [dayjs]()        | 日期时间处理库                                                |
| [numeral]()      | 数值处理库，如数值转时间、数值转文件大小等                    |
| [nprogress]()    | 进度条                                                        |
| [@vueuse/core]() | 基于 Vue Composition API 的工具库，响应式存储数据、监听事件等 |

## 最后

本仓库还在优化中，如果你在使用过程中遇到问题，欢迎在 issue 中提问。
