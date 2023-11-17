<template>
  <a-popover v-model:popup-visible="visible" position="br" trigger="click">
    <a-button class="float-right">设置</a-button>
    <template #content>
      <div class="mb-1 leading-none border-b border-gray-100 pb-3">设置表格列</div>
      <a-scrollbar outer-class="h-96 overflow-hidden" class="h-full overflow-auto">
        <ul class="grid m-0 p-0 divide-y divide-gray-100 w-[700px] overflow-auto overscroll-contain">
          <li
            v-for="(item, index) in items"
            :key="item.dataIndex"
            class="group flex items-center justify-between py-2 pr-8 select-none"
          >
            <div class="flex gap-2">
              <a-checkbox v-model="item.enable" :disabled="!item.editable" size="large" @change="onItemChange">
                {{ item.dataIndex }}
              </a-checkbox>
              <span class="hidden group-hover:inline-block ml-4">
                <i v-show="!item.editable" class="icon-park-outline-drag cursor-move"></i>
              </span>
            </div>
            <div class="flex gap-2 items-center">
              <a-checkbox v-model="item.autoWidth" :disabled="!item.editable">
                <template #checkbox="{ checked }">
                  <a-tag :checked="checked" :checkable="item.editable" color="blue">自适应</a-tag>
                </template>
              </a-checkbox>
              <a-divider direction="vertical" :margin="8"></a-divider>
              <a-input-number
                size="small"
                v-model="item.width"
                :disabled="item.autoWidth || !item.editable"
                :min="60"
                :step="10"
                class="!w-20"
              />
              <span class="text-gray-400">像素</span>
            </div>
          </li>
        </ul>
      </a-scrollbar>
      <div class="mt-4 flex gap-2 items-center justify-between">
        <div class="flex items-center">
          <a-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="onCheckAllChange"> 全选 </a-checkbox>
          <span class="text-xs text-gray-400 ml-1">
            ({{ items.filter(i => i.enable).length }}/{{ items.length }})
          </span>
        </div>
        <div class="space-x-2">
          <a-button @click="onReset">重置</a-button>
          <a-button type="primary" @click="onConfirm">确定</a-button>
        </div>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Item {
  dataIndex: string;
  enable: boolean;
  autoWidth: boolean;
  width: number;
  editable: boolean;
}

const checkAll = ref(false);
const visible = ref(false);
const items = ref<Item[]>([]);
const checked = computed(() => items.value.filter(i => i.enable));
const indeterminate = computed(() => {
  const check = checked.value.length;
  const total = items.value.length;
  return 0 < check && check < total;
});

onMounted(() => {
  items.value.push({
    dataIndex: '顺序',
    enable: true,
    autoWidth: false,
    width: 80,
    editable: false,
  });
  for (let i = 1; i <= 10; i++) {
    items.value.push({
      dataIndex: `测试${i}`,
      enable: true,
      autoWidth: false,
      width: 80,
      editable: true,
    });
  }
  items.value.push({
    dataIndex: '操作',
    enable: true,
    autoWidth: false,
    width: 80,
    editable: false,
  });
});

const onItemChange = () => {
  if (checked.value.length === 0) {
    checkAll.value = false;
    return;
  }
  if (checked.value.length === items.value.length) {
    checkAll.value = true;
  }
};

const onCheckAllChange = (value: any) => {
  for (const item of items.value) {
    if (item.editable) {
      item.enable = value;
    }
  }
};

const onReset = () => {
  visible.value = false;
};

const onConfirm = () => {
  visible.value = false;
};
</script>

<style scoped></style>
