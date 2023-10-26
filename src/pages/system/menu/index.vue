<template>
  <bread-page class="">
    <menu-table>
      <template #action>
        <a-button type="outline">展开/折叠</a-button>
      </template>
    </menu-table>
  </bread-page>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { createColumn, updateColumn, useAniTable } from "@/components";
import { MenuTypes, MenuType } from "@/constants/menu";
import { flatedMenus } from "@/router";

const menuArr = flatedMenus.map((i) => ({ label: i.title, value: i.id }));

const expanded = ref(false);
const toggleExpand = () => {
  console.log(menu.tableRef.value);
  expanded.value = !expanded.value;
  menu.tableRef.value?.tableRef?.expandAll(expanded.value);
};

const [menuTable, menu] = useAniTable({
  data: (search, paging) => {
    return api.menu.getMenus({ ...search, ...paging, tree: true });
  },
  tableProps: {
    defaultExpandAllRows: true,
  },
  columns: [
    {
      title: () => {
        return (
          <span>
            菜单名称
            <a-link class="ml-1 select-none" onClick={toggleExpand}>
              {expanded.value ? "收起全部" : "展开全部"}
            </a-link>
          </span>
        );
      },
      dataIndex: "name",
      render({ record }) {
        let id = "";
        if (record.type === MenuType.PAGE) {
          id = ` => ${record.path}`;
        }
        if (record.type === MenuType.BUTTON) {
          id = ` => ${record.code}`;
        }
        return (
          <div class="flex items-center gap-1">
            <a-tag bordered color={MenuTypes.fmt(record.type, "color")}>
              {{
                default: () => MenuTypes.fmt(record.type),
              }}
            </a-tag>
            <div class="flex-1 flex overflow-hidden ml-1">
              <div class="flex-1">
                <i class={`${record.icon} mr-1`}></i>
                <span>{record.name ?? "无"}</span>
                <span class="text-gray-400 text-xs truncate">{id}</span>
              </div>
              <a-switch checked-color="#3c9" size="small">
                {{
                  "checked-icon": () => <i class="icon-park-outline-check"></i>,
                  "unchecked-icon": () => <i class="icon-park-outline-close"></i>,
                }}
              </a-switch>
            </div>
          </div>
        );
      },
    },
    createColumn,
    updateColumn,
    {
      title: "操作",
      type: "button",
      width: 200,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          text: "新增子项",
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
    // {
    //   title: "启用",
    //   dataIndex: "createdAt",
    //   width: 80,
    //   align: "center",
    //   render: ({ record }) => <a-switch checked-color="#3c9"></a-switch>,
    // },
  ],
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
    "sort": 10302,
    "title": "菜单管理",
    "icon": "icon-park-outline-add-subtract"
  }
}
</route>
