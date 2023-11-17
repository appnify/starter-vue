<template>
  <div class="m-4 bg-white p-4">
    <user-table></user-table>
    <div>{{ formatModel(emodel) }}</div>
    <UpForm />
  </div>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { formatModel, useForm } from '@/components/AnForm';
import { useTable } from '@/components/AnTable';
import { useSelection } from '@/components/AnTable/plugins/useSelectionPlugin';
import { useRefresh } from '@/components/AnTable/plugins/useRefreshPlugin';
import { useColumnConfig } from '@/components/AnTable/plugins/useColumnConfig';
import { Ref } from 'vue';
import { Button, Message } from '@arco-design/web-vue';
import { delConfirm, sleep } from '@/utils';

const { component: UserTable } = useTable({
  plugins: [
    useRefresh(),
    useColumnConfig(),
    (() => {
      let selected: Ref<any[]>;
      return {
        id: 'deletemany',
        options(options: any) {
          let selectPlugin = options.plugins.find((i: any) => i.id === 'selection');
          if (!selectPlugin) {
            selectPlugin = useSelection();
            options.plugins.push(selectPlugin);
          }
          selected = selectPlugin.provide.selected;
          return options;
        },
        action() {
          const loading = ref(false);
          const onClick = async () => {
            await delConfirm();
            loading.value = true;
            await sleep(3000);
            loading.value = false;
            selected.value = [];
            Message.success('提示: 删除成功!');
          };
          return () => (
            <Button
              type="primary"
              status="danger"
              disabled={!selected.value.length}
              loading={loading.value}
              onClick={onClick}
            >
              批量删除
            </Button>
          );
        },
      };
    })(),
    (() => {
      let selected: Ref<any[]>;
      return {
        id: 'export',
        options(options: any) {
          let selectPlugin = options.plugins.find((i: any) => i.id === 'selection');
          if (!selectPlugin) {
            selectPlugin = useSelection();
            options.plugins.push(selectPlugin);
          }
          selected = selectPlugin.provide.selected;
          return options;
        },
        action() {
          const onClick = async () => {
            await delConfirm('确认导出选中数据吗?');
            await sleep(3000);
            selected.value = [];
            Message.success('提示: 删除成功!');
          };
          return () => (
            <Button disabled={!selected.value.length} onClick={onClick}>
              {{
                icon: () => <i class="icon-park-outline-export"></i>,
                default: () => '导出',
              }}
            </Button>
          );
        },
      };
    })(),
    (() => {
      return {
        id: 'import',
        action() {
          const onClick = async () => {
            Message.success('提示: TODO!');
          };
          return () => (
            <Button onClick={onClick}>
              {{
                icon: () => <i class="icon-park-outline-import"></i>,
                default: () => '导入',
              }}
            </Button>
          );
        },
      };
    })(),
    (() => {
      return {
        id: 'format',
        options(options) {
          for (const column of options.columns ?? []) {
            if (column.render) {
              continue;
            }
            column.render = ({ record, column }) => record[column.dataIndex!] ?? '-';
          }
        },
      };
    })(),
  ],
  data(search) {
    return api.user.getUsers(search);
  },
  paging: {
    hide: false,
  },
  columns: [
    {
      dataIndex: 'id',
      title: 'ID',
      configable: false,
    },
    {
      dataIndex: 'nickname',
      title: '用户名称',
    },
    {
      dataIndex: 'username',
      title: '登录账号',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'phone',
      title: '手机号码',
    },
    {
      dataIndex: 'createdBy',
      title: '创建人',
    },
    {
      dataIndex: 'createdAt',
      title: '创建时间',
    },
    {
      dataIndex: 'updatedBy',
      title: '更新人',
    },
    {
      dataIndex: 'updatedAt',
      title: '更新时间',
    },
    {
      title: '操作',
      type: 'button',
      width: 180,
      configable: false,
      buttons: [
        {
          text: '修改',
        },
        {
          text: '移动',
          // visible: () => false,
        },
        {
          text: '删除',
          disable: () => true,
        },
      ],
    },
  ],
  search: [
    {
      field: 'username',
      label: '用户名称',
      setter: 'input',
    },
  ],
  create: {
    title: '新增',
    modalProps: {
      width: 111,
    },
    items: [
      {
        field: 'title',
        label: '标题',
        setter: 'input',
      },
    ],
    submit: async model => {
      return 1;
    },
  },
  modify: {
    extend: true,
  },
});

const { component: UpForm, model: emodel } = useForm({
  formProps: {
    class: 'grid! grid-cols-2 gap-x-8',
  },
  items: [
    {
      field: 'id',
      label: '输入组件',
      setter: 'input',
      setterSlots: {
        prefix: () => <span>123</span>,
      },
      itemSlots: {
        help: props => props.item.label,
        extra: () => 'extra',
      },
    },
    {
      field: 'todo',
      label: '测试',
    },
    {
      field: 'xsa',
      label: '动态渲染',
      setter: 'input',
      visible: props => props.model.id,
    },
    {
      field: 'fsa',
      label: '动态禁止',
      setter: 'input',
      disable: props => props.model.id,
    },
    {
      field: 'sgs',
      label: '校验规则',
      setter: 'input',
      // required: true,
      rules: ['email'],
    },
    {
      field: 'sgss',
      label: '动态规则',
      setter: 'input',
      rules: [
        {
          required: true,
          message: '必须项',
          disable: props => !props.model.id,
        },
      ],
    },
    {
      field: 'num',
      value: 20,
      label: '数字组件',
      setter: 'number',
    },
    {
      field: 'date',
      label: '日期组件',
      setter: 'date',
    },
    {
      field: '[startDate,endDate]',
      label: '字段语法',
      setter: 'dateRange',
    },
    {
      field: '{value,dd}',
      value: { value: 1 },
      label: '下拉组件',
      setter: 'select',
      options: [
        {
          label: '测试',
          value: {
            value: 1,
            dd: 123,
          },
        },
        {
          label: '测试2',
          value: {
            value: 2,
            dd: 223,
          },
        },
      ],
      setterProps: {
        valueKey: 'value',
      },
    },
  ],
  async submit(model) {
    return { message: '操作成功' };
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10001,
    "title": "概览",
    "icon": "icon-park-outline-home"
  }
}
</route>
@/components/AnForm/components/useFormModel
