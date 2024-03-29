<template>
  <div class="w-[210px] h-full overflow-hidden grid grid-rows-[auto_1fr]">
    <div class="flex gap-2">
      <a-input-search allow-clear placeholder="分类名称" class="mb-2" @search="updateFileCategories"></a-input-search>
      <a-button @click="() => CategoryModal.open()">
        <template #icon>
          <i class="i-icon-park-outline-add"></i>
        </template>
      </a-button>
      <CategoryModal></CategoryModal>
    </div>
    <a-spin :loading="loading" class="w-full h-full">
      <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto">
        <ul v-if="list.length" class="pl-0 mt-0">
          <li :class="{ active: !current?.id }" class="group flex items-center justify-between gap-1 h-8 rounded mb-2 pl-3 hover:bg-gray-100 cursor-pointer">
            <div class="flex-1 h-full flex items-center gap-2 overflow-hidden" @click="emit('change', {})">
              <i class="i-icon-park-outline-folder-close align-[-2px]"></i>
              <span class="flex-1 truncate">全部</span>
            </div>
            <div class=""></div>
          </li>
          <li
            v-for="item in list"
            :key="item.code"
            :class="{ active: item.id === current?.id }"
            class="group flex items-center justify-between gap-1 h-8 rounded mb-2 pl-3 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex-1 h-full flex items-center gap-2 overflow-hidden" @click="emit('change', item)">
              <i class="i-icon-park-outline-folder-close align-[-2px]"></i>
              <span class="flex-1 truncate">{{ item.name }}</span>
            </div>
            <div class="">
              <a-dropdown>
                <a-button size="small" type="text">
                  <template #icon>
                    <i class="i-icon-park-outline-more-one text-gray-400 hover:text-gray-700"></i>
                  </template>
                </a-button>
                <template #content>
                  <a-doption @click="CategoryModal.open(item)">
                    <template #icon>
                      <i class="i-icon-park-outline-edit"></i>
                    </template>
                    修改
                  </a-doption>
                  <a-doption class="!text-red-500" @click="onDeleteRow(item)">
                    <template #icon>
                      <i class="i-icon-park-outline-delete"></i>
                    </template>
                    删除
                  </a-doption>
                </template>
              </a-dropdown>
            </div>
          </li>
        </ul>
        <an-empty v-else></an-empty>
      </a-scrollbar>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { FileCategory, api } from '@/api';
import { delConfirm } from '@/utils/delConfirm';
import { Message } from '@arco-design/web-vue';
import { useFormModal } from 'arconify';
import { PropType } from 'vue';

defineProps({
  current: {
    type: Object as PropType<FileCategory>,
  },
});

const emit = defineEmits(['change']);
const list = ref<FileCategory[]>([]);
const loading = ref(false);

const updateFileCategories = async () => {
  try {
    loading.value = true;
    const res = await api.fileCategory.getFileCategorys({ size: 0 });
    list.value = res.data.data ?? [];
    list.value.length && emit('change', {});
  } catch {
    // nothing to do
  } finally {
    loading.value = false;
  }
};

onMounted(updateFileCategories);

const onDeleteRow = async (row: FileCategory) => {
  await delConfirm();
  const res = await api.dictType.delDictType(row.id);
  Message.success(res.data.message);
};

const CategoryModal = useFormModal({
  trigger: false,
  modalProps: {
    width: 580,
  },
  items: [
    {
      field: 'name',
      label: '名称',
      setter: 'input',
    },
    {
      field: 'code',
      label: '编码',
      setter: 'input',
    },
    {
      field: 'description',
      label: '备注',
      setter: 'textarea',
    },
  ],
  submit: async model => {
    let res;
    if (model.id) {
      res = await api.fileCategory.setFileCategory(model.id, model);
    } else {
      res = await api.fileCategory.addFileCategory(model as any);
    }
    updateFileCategories();
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
