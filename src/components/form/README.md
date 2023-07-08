### 介绍
基于`Arco-Design`组件封装的表单，旨在通过较少的配置提升开发效率，将一些通过的状态管理内置，使得开发者只需关注核心内容即可快速开发通用型表单。

本表单适用于通用型表单，对于自定义要求较高的需求，可能不太适合。

### 功能
- 配置化编写代码，保证UI一致性，提供开发效率。
- 提供typesciprt类型提示
- 表单项和校验规则之间可联动、可动态显示/隐藏
- 内置常用校验规则，开箱即用
- 支持组件参数透传，让每个组件都能自定义。

### 基本功能
基本用法：
```tsx
<template>
  <Form v-bind="form" />
</template>

<script setup lang="ts">
import { Form, useForm } from '@/components'

const form = useForm({
  model: {
    id: undefined
  },
  items: [
    {
      field: 'username',
      label: '用户名称',
      type: 'input'
    }
  ],
  submit: async ({ model, items }) => {
    await new Promise(res => setTimeout(res, 2000));
    return { message: '操作成功!' }
  },
  formProps: {},
})
</script>
```
以上, 只有四个参数，只需定义关注的内容，剩下的内容如内部状态等, 由表单管理。
| 参数 | 说明 | 类型 |
| :--- | :--- | :--- |
| model | 表单数据(可选)，默认从`items`每一项的`field`和`initialValue`生成，如果存在同名属性，将与其合并。 | `Record<string, any>` |
| items | 表单项，具体用法看下文。| `FormItem[]` |
| submit | 提交表单的函数，可为同步/异步函数。当有返回值且返回值为包含`message`的对象时，将弹出成功提示。| `({ model, items }) => Promise<any>` |
| formProps | 传递给`AForm`组件的参数(可选)，具体可参考`Arco-Design`的`Form`组件，部分参数不可用，如`model`等。 | `FormInstance['$props']` |

### 表单数据
`model`表示当前表单的数据，当使用`useForm`时，将从`items`中每一项的`field`和`initialValue`生成。如果`model`中的属性与`field`值同名，且`initialValue`值不为空，则原`model`中的同名属性值将被覆盖。

对于日期范围框、级联选择器等值为数组的组件，提供有一份便捷的语法，请看如下示例:
```typescript
const form = useForm({
  items: [
    {
      field: `startDate:endDate`,
      label: '日期范围',
      type: 'dateRange',
    },
    {
      field: 'provice:city:town',
      label: '省市区',
      type: 'cascader',
      options: []
    }
  ]
})
```
以上，`field`可通过`:`分隔的语法，指定提交表单时，将数组值划分到指定的属性上，最终提交的数据如下：
```typescript
{
  startDate: '',
  endDate: '',
  province: '',
  city: '',
  town: ''
}
```

### 表单项
用法示例:
```typescript
const form = useForm({
  items: [
    {
      field: 'username',
      initialValue: 'apptify',

      label: '用户名称',
      type: 'input',

      itemProps: {},
      nodeProps: {},

      visible: ({ model, item, items }) => true,
      disable: ({ model, item, items }) => true,

      required: true,
      rules: ['email'],

      options: ({ model }) => api.xx(model.id)

      component: ({ model, item, items }) => <div> </div>,
      help: string |
    }
  ]
})
```
用法说明：
| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| field | 字段名，将合并合并到`model`中，默认值为`undefined`，可通过`initalValue`指定初始值 | string | - |
| initialValue | 初始值,  作为默认初始值以及通过`formRef.reset`重置表单数据时的值 | any | undefined |
| label | 标签名，可为字符串或函数, 作用同`AFormItem`的`label`参数 | string \| ({ model,item }) => JSX.Element | - |
| type | 输入控件的类型，具体可参考下文 | NodeType | 'input' |
| visible | 动态控制该表单项是否显示 | boolean \| ({ model,item }) => boolean | - |
| disable | 动态控制该表单项是否禁止，作用同`FormItem`的`disabled`属性 | boolean \| ({ model, item }) => boolean | - |
| required | 是否必填，作用同`AFormItem`的`required`属性 | boolean | - |
| rules | 校验规则，内置常用规则，并支持动态生效，详见下文 | RuleType[] | - |
| options | 作用域`select`等多选项组件，支持动态获取 | (Option[]) \| ({ model, item }) => Option[] | - |
| itemProps | 传递给`AFormItem`组件的参数，部分参数不可用，如上面的`field`等参数 | FormItemInstance['$props'] | - |
| nodeProps | 传递给`type`属性对应组件的参数，如当`type`为`input`时, `nodeProps`类型为`Input`组件的props。 | NodeProps | - |

### 控件类型
表单项的`type`指定表单控件的类型，当输入具体的值时，`nodeProps`会提供对应的参数类型提示。内置有常见的组件，且带有默认的参数，具体默认参数可在`src/components/form/form-node.tsx`中查看：

| 类型 | 说明 |
| :--- | :--- |
| input | 同 [Input](https://arco.design/vue/component/input) 组件
| number | 同 [InputNumber](https://arco.design/vue/component/input-number) 组件
| password | 同 [InputPassword](https://arco.design/vue/component/input#password) 组件
| select | 同 [Select](https://arco.design/vue/component/select) 组件
| time | 同 [TimePicker](https://arco.design/vue/component/time-picker) 组件
| date | 同 [DatePicker](https://arco.design/vue/component/date-picker) 组件
| dateRange | 同 [RangePicker](https://arco.design/vue/component/date-picker#range) 组件
| textarea | 同 [Textarea](https://arco.design/vue/component/textarea) 组件
| cascader | 同 [Cascader](https://arco.design/vue/component/cascader) 组件
| checkbox | 同 [Checkbox](https://arco.design/vue/component/checkbox) 组件
| radio | 同 [Radio](https://arco.design/vue/component/radio) 组件
| slider | 同 [Slider](https://arco.design/vue/component/slider) 组件
| submit | 提交表单按钮，应只有一个。
| custom | 自定义组件，通过表单项的`component`属性定义，需返回一个JSX元素。

对于`select`、`checkbox`、`radio`和`cascader`类型，其`options`参数不通过`nodeProps`传递，而是写在表单项的`options`属性。该属性支持数组和函数类型，当为数组类型时将直接传递给控件，当为函数时可动态请求，返回值需为数组类型。

以上描述，示例如下：
```typescript
const form = useForm({
  items: [
    {
      field: 'gender',
      label: '性别',
      type: 'select',
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        }
      ]
    },
    {
      field: 'departmentId',
      label: '部门',
      type: 'cascader',
      options: async ({ model, item }) => {
        const res = await api.getDepartments(model.xx);
        return res.data;
      }
    }
  ]
})
```

### 表单校验

跟表单校验相关的属性有2个，`required`(必填)和`rules`属性，其中`rules`内置常见的校验规则，参考如下：
| 校验规则 | 说明 |
| :--- | :--- |
| string | 格式为字符串 |
| number | 格式为数字 |
| passwod | 格式为密码类型，即至少包含大写字母、小写字母、数字和特殊字符。|
| required | 该项必填 |
| email | 格式为邮箱类型，例如: xx@abc.com |
| url | 格式为URL类型, 例如: https://abc.com |
| ip | 格式为IP类型, 例如: 101.10.10.302 |
| phone | 格式为11位手机号，例如: 15912345678 |
| idcard | 格式为18位身份证号，例如: 12345619991205131x |
| alphabet | 格式为26字母，例如：apptify |

当以上规则不满足需求时，可通过对象自定义校验规则，具体语法可参考`AFormItem`的 [FieldRule](https://arco.design/vue/component/form#FieldRule) 文档。在其基础上，可添加一个`disable`函数，用于动态禁止/允许当前校验规则。

用法示例：
```typescript
const form = useForm({
  items: [
    {
      required: true,
      rules: [
        'email',
        {
          match: /\d{2,3}/,
          message: '请输入2~3位数字',
          disable: ({ model, item, items }) => !model.username
        }
      ],
    }
  ]
})
```

### 提交表单
`submit`为提交表单的函数，通常返回一个`promise`，当该函数抛出异常，则默认为提交失败。该函数有一个可选的返回值，如果返回值为包含`message`的对象时，将弹出一个包含`message`值的成功提示。

示例如下：
```typescript
const form = useForm({
  submit: async ({ model, items }) => {
    const res = await api.xx(model);
    return { message: res.msg }
  }
})
```

### 常见问题
- Q：为什么不是模板形式？
- A：配置式更易于描述逻辑，模板介入和引入的组件比较多，且对于做typescript类型提示不是很方便。
- Q：为什么不是JSON形式？
- A：对于自定义组件支持、联动等不是非常友好，尽管可以通过解析字符串执行等方式实现，对typescript提示也不是很友好。

### 最后
尽管看起来是低代码，但其实我更倾向于是业务组件。