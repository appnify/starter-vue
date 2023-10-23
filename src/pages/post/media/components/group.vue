<template>
  <div class="w-[210px] h-full overflow-hidden grid grid-rows-[auto_1fr]">
    <div class="flex gap-2">
      <a-input-search allow-clear placeholder="分组名称..." class="mb-2"></a-input-search>
      <a-button @click="onCreateRow">
        <template #icon>
          <i class="icon-park-outline-add"></i>
        </template>
      </a-button>
      <form-modal></form-modal>
    </div>
    <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto">
      <ul class="pl-0 mt-0">
        <li
          v-for="item in list"
          :key="item.id"
          class="group flex items-center justify-between gap-1 h-8 rounded mb-2 pl-3 hover:bg-gray-100 cursor-pointer"
        >
          <div>
            <i class="icon-park-outline-folder-close"></i>
            {{ item.title }}
            <span class="text-xs text-gray-500"> ({{ item.count }}) </span>
          </div>
          <div>
            <a-dropdown>
              <a-button size="small" type="text">
                <template #icon>
                  <i class="icon-park-outline-more-one text-gray-400 hover:text-gray-700"></i>
                </template>
              </a-button>
              <template #content>
                <a-doption @click="onModifyRow(item)">
                  <template #icon>
                    <i class="icon-park-outline-edit"></i>
                  </template>
                  修改
                </a-doption>
                <a-doption class="!text-red-500" @click="onDeleteRow">
                  <template #icon>
                    <i class="icon-park-outline-delete"></i>
                  </template>
                  删除
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </li>
      </ul>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useAniFormModal } from "@/components";
import { delConfirm } from "@/utils";

const data = [
  {
    id: 1,
    title: "生活笔记",
    count: 23,
  },
  {
    id: 2,
    title: "微信头像",
    count: 52,
  },
  {
    id: 3,
    title: "文章封面",
    count: 19,
  },
  {
    id: 4,
    title: "山水诗画",
    count: 81,
  },
  {
    id: 5,
    title: "虾米沙雕",
    count: 12,
  },
];

const list = ref(data);

const onModifyRow = (row: any) => {
  formCtx.props.title = "修改分组";
  formCtx.open(row);
};

const onCreateRow = () => {
  formCtx.props.title = "新建分组";
  formCtx.open();
};

const onDeleteRow = async () => {
  await delConfirm();
};

const [formModal, formCtx] = useAniFormModal({
  title: "修改分组",
  trigger: false,
  modalProps: {
    width: 432,
  },
  model: {
    id: undefined,
  },
  items: [
    {
      field: "title",
      label: "分组名称",
      type: "input",
    },
  ],
  submit: async ({ model }) => {
    if (model.id) {
      const item = list.value.find((i) => i.id === model.id);
      if (item) {
        item.title = model.title;
      }
    } else {
      const ids = list.value.map((i) => i.id);
      const maxId = Math.max.apply(null, ids);
      list.value.push({
        id: maxId,
        title: model.title,
        count: 0,
      });
    }
  },
});
</script>

<style lang="less" scoped></style>
