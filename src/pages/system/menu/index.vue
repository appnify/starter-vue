<template>
  <bread-page class="">
    <MenuTable> </MenuTable>
  </bread-page>
</template>

<script setup lang="tsx">
import { api } from '@/api';
import { MenuType, MenuTypes } from '@/constants/menu';
import { flatMenus } from '@/router';
import { listToTree } from '@/utils/listToTree';
import { useTable } from 'arconify';

defineOptions({ name: 'SystemMenuPage' });

const menuArr = flatMenus.map(i => ({ label: i.title, value: i.id }));
const expanded = ref(false);
const toggleExpand = () => {
  expanded.value = !expanded.value;
  MenuTable.tableRef.value?.tableRef?.expandAll(expanded.value);
};

const MenuTable = useTable({
  columns: [
    {
      title: () => (
        <span>
          菜单名称
          <a-link class="ml-1 select-none" onClick={toggleExpand}>
            {expanded.value ? '收起全部' : '展开全部'}
          </a-link>
        </span>
      ),
      dataIndex: 'name',
      render({ record }) {
        let id = '';
        if (record.type === MenuType.PAGE) {
          id = ` => ${record.path}`;
        }
        if (record.type === MenuType.BUTTON) {
          id = ` => ${record.code}`;
        }
        return (
          <div class="flex-1">
            <i class={`${record.icon} mr-1`}></i>
            <span>{record.name ?? '无'}</span>
            <span class="text-gray-400 text-xs truncate">{id}</span>
          </div>
        );
      },
    },
    {
      title: '标识',
      width: 200,
      dataIndex: 'code',
    },
    {
      title: '类型',
      width: 100,
      align: 'center',
      render: ({ record }) => (
        <a-tag bordered color={MenuTypes.fmt(record.type, 'color')}>
          {{
            default: () => MenuTypes.fmt(record.type),
          }}
        </a-tag>
      ),
    },
    {
      title: '操作',
      type: 'button',
      width: 200,
      buttons: [
        {
          text: '新增子项',
          disable: ({ record }) => record.type === MenuType.BUTTON,
          onClick: ({ record }) => {
            console.log(record);
          },
        },
        {
          type: 'modify',
          text: '修改',
        },
        {
          text: '删除',
          type: 'delete',
          onClick: ({ record }) => {
            return api.menu.delMenu(record.id);
          },
        },
      ],
    },
  ],
  data: search => [],
  search: [
    {
      field: 'name',
      label: '菜单名称',
      required: false,
      setter: 'search',
    },
  ],
  create: {
    modalProps: {
      title: '新建菜单',
      width: 980,
    },
    formProps: {
      class: '!grid grid-cols-2 gap-x-4',
    },
    items: [
      {
        field: 'parentId',
        value: 0,
        label: '父级',
        setter: 'treeSelect',
        setterProps: {
          fieldNames: {
            key: 'id',
            title: 'name',
          },
        },
        async options() {
          const res = await api.menu.getMenus({ size: 0 });
          const data = res.data.data?.filter(i => i.type !== MenuType.BUTTON) ?? [];
          for (const item of data) {
            const type = MenuTypes.fmt(item.type);
            // @ts-ignore
            item.icon = () => `[${type}]`;
          }
          const list = listToTree(data);
          return [
            {
              id: 0,
              name: '主类目',
              children: list,
            },
          ];
        },
      },
      {
        field: 'type',
        value: 1,
        label: '类型',
        setter: 'select',
        options: MenuTypes.raw,
      },
      {
        field: 'name',
        label: '名称',
        setter: 'input',
        required: true,
      },
      {
        field: 'code',
        label: '标识',
        setter: 'input',
        required: true,
      },
      {
        field: 'icon',
        label: '图标',
        setter: 'input',
        required: true,
        visible: ({ model }) => model.type !== MenuType.BUTTON,
      },
      {
        field: 'path',
        label: '路径',
        setter: 'input',
        required: true,
        visible: ({ model }) => model.type !== MenuType.BUTTON,
        setterProps: {
          placeholder: '内链请以 / 开头，外链请以 http 开头',
        },
        rules: [
          {
            match: /^(\/|http)/,
            message: '请以 / 或 http 开头',
          },
        ],
      },
      {
        field: 'component',
        label: '关联组件',
        setter: 'select',
        required: true,
        visible: ({ model }) => model.type === MenuType.PAGE,
        options: menuArr,
        setterProps: {
          placeholder: '当前页面对应的前端组件',
        },
      },
      {
        field: 'description',
        label: '菜单描述',
        setter: 'textarea',
        itemProps: {
          class: 'col-span-2',
        },
      },
    ],
    submit: model => {
      return api.menu.addMenu(model as any);
    },
  },
  modify: {
    extend: true,

    submit: model => {
      return api.menu.setMenu(model.id, model);
    },
  },
});
</script>

<style lang="less">
.arco-table-cell-expand-icon {
  span.arco-table-cell-inline-icon {
    margin-right: 6px;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "name": "SystemMenuPage",
    "sort": 10302,
    "title": "菜单管理",
    "icon": "icon-park-outline-add-subtract"
  }
}
</route>
