### 基本用法

```typescript
<template>
  <Table v-bind="table" />
</template>
<script setup lang="ts">
import { Table, useTable } from '@/components'
const table = useTable({
  data: (search, paging) => {
    return {
      data: [
        {
          username: '用户A'
        }
      ],
      meta: {
        total: 30
      }
    };
  },
  columns: [
    {
      title: "用户名称",
      dataIndex: "username",
    },
  ],
  pagination: {
    pageSize: 10,
    showTotal: true
  },
  search: {
    items: [
      {
        field: "username",
        label: "用户名称",
        type: "input",
      },
    ],
  },
  common: {
    items: [
      {
        field: "username",
        label: "用户名称",
        type: "input",
      },
    ],
  },
  create: {
    title: "新建用户",
    submit: async ({ model }) => {
      return api.xx(model);
    },
  },
  modify: {
    title: "修改用户",
    submit: async ({ model }) => {
      return api.xx(model);
    },
  },
});
</script>
```
以上，就是一个CRUD表格的简单用法。参数描述：
| 参数 | 说明 | 类型 |
| :--- | :--- | :--- |
| data | 表格数据，可为数组或函数(发起HTTP请求) | BaseData[] | ((search, paging) => Promise<any>) |
| columns | 表格列，参见 [TableColumnData](https://arco.design/vue/component/table#TableColumnData) 文档，增加和扩展部分属性，详见下文。 | TableColumnData[] |
| pagination | 分页参数，参见 [Pagination](https://arco.design/vue/component/pagination) 文档，默认 15/每页。| Pagination |
| search | 搜索表单的配置，参见 [Form]() 说明，其中 `submit` 参数不可用 | FormProps |
| common | 新增和修改表单弹窗的公用参数，参见 [FormModal]() 说明。 | FormModalProps |
| create | 新增表单弹窗的参数，参见 [FormModal]() 说明， 将与`common`参数合并。 | FormModalProps |
| modify | 修改表单弹窗的参数，参见 [FormModal]() 说明， 将与`common`参数合并。 | FormModalProps |
| tableProps | 传递给`Table`组件的参数，参见 [Table](https://arco.design/vue/component/table) 文档，其中`columns`参数不可用。| TableProps |

### 表格数据
`data`定义表格数据，可以是数组或函数。
- 当是数组时，直接用作数据源。
- 当是函数时，传入查询参数和分页参数，可返回数组或对象，返回数组作用同上，返回对象时需遵循`{ data: [], meta: { total: number } }`格式，用于分页处理。

用法示例：
```typescript
const table = useTable({
  data: async (search, paging) {
    const { page, size: pageSize } = paging
    const res = await api.xx({ ...search, page, pageSize });
    return {
      data: res.data,
      meta: {
        total: res.total
      }
    }
  }
})
```

### 表格列
`columns`定义表格列，并在原本基础上增加默认值并扩展部分属性。增加和扩展的属性如下：

| 参数 | 说明 | 类型 |
| :--- | :--- | :--- |
| type | 特殊类型, 目前支持`index`(表示行数)、`button`(行操作按钮) | 'index' | 'button' |
| buttons | 当`type`为`button`时的按钮数组，如果子项是对象则为`Button`组件的参数，如果为函数则为自定义渲染函数。 | Button[]

### 表格分页
`pagination`定义分页行为，具体参数可参考 [Pagination](https://arco.design/vue/component/pagination) 文档。当`data`为数组时，将作为数据源进行分页；当`data`为函数且返回值为对象时，则根据`total`值进行分页。

### 搜索表单
参阅

### 公共参数
参数为`FormModal`的参数，主要作为新增和修改的公共参数。在大多数情况，新增和修改的配置大多是相似的，没必要写两份，把相同的参数写在这里即可，不同的参数在`create`和`modify`中单独配置。

注意，这里的`items`也可以被搜索表单复用，搜索表单可通过`extends: <field>`继承`common.items`中对应的字段配置。使用示例如下：
```typescript
const table = useTable({
  common: {
    items: [
      {
        field: 'username',
        label: '用户名称',
        type: 'input',
        required: true,
      }
    ]
  },
  search: {
    items: [
      {
        extend: 'usernam',
        required: false,
      }
    ]
  }
})
```

### 新增弹窗
`create`为新增表单弹窗的参数，即`useFormModal`对应的参数。参阅。当指定该参数时，会在表格左上添加新建按钮，如需自定义按钮样式或自定义渲染，可通过`create.trigger`参数配置。

### 修改弹窗
`modify`为新增表单弹窗的参数，即`useFormModal`对应的参数。参阅。当指定该参数时，会在表格行添加修改按钮。

### 表格参数
`tableProps`为传递给`Table`组件的额外参数，其中部分参数不可用，如`data`和`columns`等。此外，部分参数有默认值，具体参数可查看`src/components/table/table.config.ts`文件。

### 插槽
- `Table`组件的插槽可正常使用
- `action`插槽用作表格左上方的操作区。

## 问题
- 问题：日期范围框值为数组，处理不方便
- 解决：字段名使用`v1:v2`格式，提交时会生成`{ v1: '00:00:01', v2: '00:00:02' }`数据
- 问题：搜索表单、新增表单和修改表单通常用到同一表单项，如何避免重复定义
- 解决：表单项使用`{ extends: <field-name> }`会在`common.items`中寻找相同的项，并合并值。
