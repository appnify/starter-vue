<template>
  <bread-page class="">
    <Table v-bind="table">
      <template #action>
        <a-button type="outline">展开/折叠</a-button>
      </template>
    </Table>
  </bread-page>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, createColumn, updateColumn, useTable } from "@/components";
import { MenuTypes, MenuType } from "@/constants/menu";
import { flatedMenus } from "@/router";

const menuArr = flatedMenus.map((i) => ({ label: i.title, value: i.id }));

const table = useTable({
  data: (search, paging) => {
    return api.menu.getMenus({ ...search, ...paging, tree: true });
  },
  columns: [
    {
      title: "菜单名称",
      dataIndex: "name",
      width: 180,
    },
    {
      title: "类型",
      dataIndex: "description",
      align: "center",
      width: 120,
      render: ({ record }) => (
        <a-tag color={MenuTypes.fmt(record.type, "color")}>
          {{
            icon: <i class={record.icon}></i>,
            default: () => MenuTypes.fmt(record.type),
          }}
        </a-tag>
      ),
    },
    {
      title: "访问路径",
      dataIndex: "path",
    },
    {
      title: "启用",
      dataIndex: "createdAt",
      width: 80,
      align: "center",
      render: ({ record }) => <a-switch size="small" checked-color="#3c9"></a-switch>,
    },
    createColumn,
    updateColumn,
    {
      title: "操作",
      type: "button",
      width: 184,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          text: "新增下级",
          disabled: ({ record }) => record.type === MenuType.BUTTON,
          onClick: ({ record }) => {
            console.log(record);
          },
        },
        {
          text: "删除",
          type: "delete",
          onClick: ({ record }) => {
            return api.menu.delMenu(record.id);
          },
        },
      ],
    },
  ],
  pagination: {
    visible: false,
  },
  search: {
    items: [
      {
        extend: "name",
        required: false,
        nodeProps: {
          placeholder: "菜单名称",
        },
      },
    ],
  },
  create: {
    title: "新建菜单",
    modalProps: {
      width: 732,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-4",
    },
    items: [
      {
        field: "type",
        initial: 1,
        label: "类型",
        type: "radio",
        options: MenuTypes.raw,
        nodeProps: {
          type: "button",
          class: "w-full",
        },
      },
      {
        field: "parentId",
        initial: 0,
        label: "父级",
        type: "treeSelect",
        async options(arg) {
          const res = await api.menu.getMenus({ size: 0, tree: true });
          const data = res.data.data;
          console.log(arg);
          return [
            {
              id: 0,
              name: "主类目",
              children: data,
            },
          ];
        },
        nodeProps: {
          fieldNames: {
            icon: undefined,
            key: "id",
            title: "name",
          },
        },
      },
      {
        field: "name",
        label: "名称",
        type: "input",
        required: true,
      },
      {
        field: "code",
        label: "标识",
        type: "input",
        required: true,
      },
      {
        field: "icon",
        label: "图标",
        type: "input",
        required: true,
        visible: ({ model }) => model.type !== MenuType.BUTTON,
      },
      {
        field: "path",
        label: "路径",
        type: "input",
        required: true,
        visible: ({ model }) => model.type !== MenuType.BUTTON,
        nodeProps: {
          placeholder: "内链请以 / 开头，外链请以 http 开头",
        },
        rules: [
          {
            match: /^(\/|http)/,
            message: "请以 / 或 http 开头",
          },
        ],
      },
      {
        field: "component",
        label: "关联组件",
        type: "select",
        required: true,
        visible: ({ model }) => model.type === MenuType.PAGE,
        options: menuArr,
        nodeProps: {
          placeholder: "当前页面对应的前端组件",
        },
      },
      {
        field: "description",
        label: "菜单描述",
        type: "textarea",
        itemProps: {
          class: "col-span-2",
        },
      },
    ],
    submit: ({ model }) => {
      return api.menu.addMenu(model);
    },
  },
  modify: {
    extend: true,
    title: "修改菜单",
    submit: ({ model }) => {
      return api.menu.setMenu(model.id, model);
    },
  },
});
</script>

<style lang="less"></style>

<route lang="json">
{
  "meta": {
    "sort": 10201,
    "title": "菜单管理",
    "icon": "icon-park-outline-add-subtract"
  }
}
</route>
