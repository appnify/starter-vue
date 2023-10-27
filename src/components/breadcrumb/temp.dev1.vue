<template>
  <bread-page>
    <template #content>
      <div class="h-full w-full grid grid-cols-[auto_1fr] gap-4 p-4">
        <div class="bg-white w-[256px]">
          <div class="flex items-center justify-between gap-2 px-4 h-14">
            <span class="text-base">菜单列表</span>
            <div>
              <a-button>
                <template #icon>
                  <i class="icon-park-outline-plus"></i>
                </template>
              </a-button>
            </div>
          </div>
          <a-tree
            :data="menus"
            :default-expand-all="true"
            :block-node="true"
            :field-names="{
              icon: undefined,
              title: 'name',
              key: 'id',
            }"
          >
            <template #title="node">
              <div class="group flex-1 flex items-center justify-between gap-2">
                <div @click="onEdit(node)">
                  <!-- <a-tag :color="MenuTypes.fmt(node.type, 'color')" size="small" :bordered="true">
                    {{ MenuTypes.fmt(node.type) }}
                  </a-tag> -->
                  <i :class="node.icon" class="ml-2"></i>
                  {{ node.name }}
                </div>
                <div class="hidden group-hover:block">
                  <i
                    v-if="node.type === MenuType.MENU"
                    class="text-sm text-gray-400 hover:text-gray-700 icon-park-outline-plus"
                  ></i>
                  <i class="text-sm text-gray-400 hover:text-gray-700 icon-park-outline-delete"></i>
                </div>
              </div>
            </template>
          </a-tree>
        </div>
        <div class="bg-white">
          <a-card title="菜单信息" :bordered="false">
            <Form ref="formRef" v-bind="form"></Form>
          </a-card>
          <a-divider :margin="0"></a-divider>
          <div class="px-4 mt-4">
            <btn-table></btn-table>
          </div>
        </div>
      </div>
    </template>
  </bread-page>
</template>

<script setup lang="tsx">
import { Menu, api } from "@/api";
import { useForm, Form, useAniTable, FormInstance } from "@/components";
import { MenuType, MenuTypes } from "@/constants/menu";

const formRef = ref<FormInstance | null>(null);
const menus = ref<any[]>([]);
const treeEach = (tree: any[], fn: any) => {
  for (const item of tree) {
    if (item.children) {
      treeEach(item.children, fn);
    }
    fn(item);
  }
};

const onEdit = (row: any) => {
  formRef.value?.setModel(row);
  (btn.props as any).data = row.buttons;
};

onMounted(async () => {
  const res = await api.menu.getMenus({ tree: true });
  const data = res.data.data ?? [];
  treeEach(data, (item: Menu) => {
    if (item.type === MenuType.BUTTON) {
      return;
    }
    if (item.type === MenuType.PAGE) {
      (item as any).buttons = (item as any).children;
      delete (item as any).children;
    }
    (item as any).iconRender = () => <i class={item.icon} />;
  });
  menus.value = data;
});

const form = useForm({
  items: [
    {
      field: "name",
      label: "菜单名称",
      type: "input",
    },
    {
      field: "icon",
      label: "菜单图标",
      type: "input",
    },
  ],
  async submit(arg) {
    console.log(arg);
  },
});

const [btnTable, btn] = useAniTable({
  columns: [
    {
      title: " 名称",
      dataIndex: "name",
    },
    {
      title: "标识",
      dataIndex: "code",
    },
    {
      title: "操作",
      type: "button",
      width: 140,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          text: "删除",
          type: "delete",
        },
      ],
    },
  ],
  create: {},
  modify: {},
});
</script>

<style lang="less" scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10302,
    "title": "菜单管理",
    "icon": "icon-park-outline-add-subtract"
  }
}
</route>
