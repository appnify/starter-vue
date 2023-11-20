<template>
  <div class="m-4 bg-white p-4">
    <user-table></user-table>
  </div>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { useTable } from '@/components/AnTable';
import { useColumnConfig } from '@/components/AnTable/plugins/useColumnConfig';
import { useRefresh } from '@/components/AnTable/plugins/useRefreshPlugin';
import { useSelection } from '@/components/AnTable/plugins/useSelectionPlugin';
import { delConfirm, sleep } from '@/utils';
import { Button, Message } from '@arco-design/web-vue';
import { Ref } from 'vue';

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
            <Button status="danger" disabled={!selected.value.length} loading={loading.value} onClick={onClick}>
              {{
                icon: () => <i class="icon-park-outline-delete" />,
                default: () => '删除',
              }}
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
                icon: () => <i class="icon-park-outline-code-download"></i>,
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
    (() => {
      return {
        id: 'rowDelete',
        options(options) {
          for (const column of options.columns ?? []) {
            if (column.type !== 'button') {
              continue;
            }
            const btn = column.buttons.find(i => i.type === 'delete');
            if (!btn) {
              continue;
            }
            const onClick = btn.onClick;
            btn.onClick = async props => {
              await delConfirm(btn.confirm);
              const res: any = await onClick?.(props);
              const msg = res?.data?.message;
              msg && Message.success(`提示: ${msg}`);
            };
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
          type: 'delete',
          confirm: '确定删除吗？',
          text: '删除',
          // disable: () => true,
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
      width: 580,
    },
    items: [
      {
        field: 'title',
        label: '标题',
        setter: 'input',
      },
      {
        field: 'title2',
        label: '标题',
        setter: 'input',
      },
      {
        field: 'title1',
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
