<template>
  <div class="w-[210px] h-full overflow-hidden grid grid-rows-[auto_1fr]">
    <div class="flex gap-2">
      <a-input-search allow-clear placeholder="字典类型" class="mb-2"></a-input-search>
      <a-button @click="formCtx.open">
        <template #icon>
          <i class="icon-park-outline-add"></i>
        </template>
      </a-button>
      <form-modal></form-modal>
    </div>
    <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto">
      <ul v-if="list.length" class="pl-0 mt-0">
        <li
          v-for="item in list"
          :key="item.code"
          :class="{ active: item.id === current?.id }"
          class="group flex items-center justify-between gap-1 h-8 rounded mb-2 pl-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex-1 h-full flex items-center gap-2 overflow-hidden" @click="emit('change', item)">
            <i class="icon-park-outline-folder-close align-[-2px]"></i>
            <span class="flex-1 truncate">{{ item.name }}</span>
          </div>
          <div class="">
            <a-dropdown>
              <a-button size="small" type="text">
                <template #icon>
                  <i class="icon-park-outline-more-one text-gray-400 hover:text-gray-700"></i>
                </template>
              </a-button>
              <template #content>
                <a-doption @click="formCtx.open(item)">
                  <template #icon>
                    <i class="icon-park-outline-edit"></i>
                  </template>
                  修改
                </a-doption>
                <a-doption class="!text-red-500" @click="onDeleteRow(item)">
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
      <ani-empty v-else></ani-empty>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { DictType, api } from "@/api";
import { useAniFormModal } from "@/components";
import { delConfirm } from "@/utils";
import { Message } from "@arco-design/web-vue";
import { PropType } from "vue";

defineProps({
  current: {
    type: Object as PropType<DictType>,
  },
});

const emit = defineEmits(["change"]);
const list = ref<DictType[]>([]);

const updateDictTypes = async () => {
  const res = await api.dictType.getDictTypes({ size: 0 });
  list.value = res.data.data ?? [];
  list.value.length && emit("change", list.value[0]);
};

onMounted(updateDictTypes);

const onDeleteRow = async (row: DictType) => {
  await delConfirm();
  const res = await api.dictType.delDictType(row.id);
  Message.success(res.data.message);
};

const [formModal, formCtx] = useAniFormModal({
  title: ({ model }) => (!model.id ? "新建字典类型" : "修改字典类型"),
  trigger: false,
  modalProps: {
    width: 580,
  },
  model: {
    id: undefined,
  },
  items: [
    {
      field: "name",
      label: "名称",
      type: "input",
    },
    {
      field: "code",
      label: "唯一编码",
      type: "input",
    },
    {
      field: "description",
      label: "备注信息",
      type: "textarea",
    },
  ],
  submit: async ({ model }) => {
    let res;
    if (model.id) {
      res = await api.dictType.setDictType(model.id, model);
    } else {
      res = await api.dictType.addDictType(model);
    }
    updateDictTypes();
    return res;
  },
});
</script>

<style lang="less" scoped>
.active {
  color: rgb(var(--primary-6));
  background-color: rgb(var(--primary-1));
}
</style>
