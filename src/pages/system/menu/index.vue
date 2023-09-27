<template>
  <bread-page class="">
    <Table v-bind="table"></Table>
  </bread-page>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";
import { menus } from "@/router";
import { cloneDeep } from "lodash-es";

const items = cloneDeep(menus) as any;
for (const item of items) {
  item.checked = false;
  // if (item.icon) {
  //   const icon = item.icon;
  //   item.icon = () => <i class={icon}></i>;
  // }
  item.switcherIcon = () => null;
  if (item.children) {
    for (const child of item.children) {
      // if (child.icon) {
      //   const icon = child.icon;
      //   child.icon = () => <i class={icon}></i>;
      // }
      child.checked = false;
    }
  }
}

const state = reactive({
  menus: items,
  visible: true,
});

const indeter = (items: any[]) => {
  if (!items) {
    return false;
  }
  const checked = items.filter((item) => item.checked);
  return checked.length > 0 && checked.length < items.length;
};

const onItemChange = (item: any, menu: any) => {
  const checked = menu.children.filter((item: any) => item.checked);
  if (checked === 0) {
    menu.checked = false;
  } else if (checked === menu.children.length) {
    menu.checked = true;
  }
};

const table = useTable({
  data: items,
  columns: [
    {
      title: "角色名称",
      dataIndex: "title",
      width: 180,
      render: ({ record }) => {
        return (
          <span>
            <i class={`${record.icon} mr-1 ml-1 vertical-[-2px]`}></i>
            { record.title }
          </span>
        )
      }
    },
    {
      title: "类型",
      dataIndex: "description",
      align: 'center',
      width: 80,
      render: () => <a-tag color="blue">菜单</a-tag>,
    },
    {
      title: "访问路径",
      dataIndex: "path",
    },
    {
      title: "启用",
      dataIndex: "createdAt",
      width: 80,
      align: 'center',
      render: ({ record }) => <a-switch size="small" checked-color="#3c9"></a-switch>,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
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
          text: "分配权限",
          onClick: ({ record }) => {
            console.log(record);
          },
        },
        {
          text: "删除",
          type: "delete",
          onClick: ({ record }) => {
            return api.role.delRole(record.id);
          },
        },
      ],
    },
  ],
  pagination: {
    visible: false
  },
  search: {
    items: [
      {
        extend: "name",
        required: false,
        nodeProps: {
          placeholder: "请输入角色名称",
        },
        itemProps: {
          hideLabel: true,
        },
      },
    ],
  },
  create: {
    title: "新建角色",
    modalProps: {
      width: 580,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    items: [
      {
        field: "name",
        label: "角色名称",
        type: "input",
        required: true,
      },
      {
        field: "slug",
        label: "角色标识",
        type: "input",
      },
      {
        field: "description",
        label: "个人描述",
        type: "textarea",
      },
      {
        field: "permissionIds",
        label: "关联权限",
        type: "select",
        options: () => api.permission.getPermissions(),
        nodeProps: {
          multiple: true,
        },
      },
    ],
    submit: ({ model }) => {
      return api.role.addRole(model);
    },
  },
  modify: {
    extend: true,
    title: "修改角色",
    submit: ({ model }) => {
      return api.role.updateRole(model.id, model);
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
