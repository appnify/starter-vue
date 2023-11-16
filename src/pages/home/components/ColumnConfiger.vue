<template>
  <a-popover position="br" trigger="click">
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
              <a-checkbox v-model="item.enable" :disabled="item.disable" size="large" @change="onItemChange">
                {{ item.dataIndex }}
              </a-checkbox>
              <span class="hidden group-hover:inline-block ml-4">
                <i v-show="!item.disable" class="icon-park-outline-drag cursor-move"></i>
              </span>
            </div>
            <div class="flex gap-2 items-center">
              <a-checkbox v-model="item.autoWidth" :disabled="item.disable">
                <template #checkbox="{ checked }">
                  <a-tag :checked="checked" :checkable="!item.disable" color="blue">自适应</a-tag>
                </template>
              </a-checkbox>
              <a-divider direction="vertical" :margin="8"></a-divider>
              <a-input-number
                size="small"
                v-model="item.width"
                :disabled="item.autoWidth || item.disable"
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
          <a-checkbox
            :indeterminate="indeterminate"
            v-model="checkAll"
            @change="(v: any) => items.forEach(i => i.enable = v)"
          >
            全选
          </a-checkbox>
          <span class="text-xs text-gray-400 ml-1">
            ({{ items.filter(i => i.enable).length }}/{{ items.length }})
          </span>
        </div>
        <div class="space-x-2">
          <a-button>重置</a-button>
          <a-button type="primary">确定</a-button>
        </div>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const items = ref(
  Array(10)
    .fill(0)
    .map((v, i) => {
      return {
        dataIndex: `测试${i}`,
        enable: true,
        autoWidth: false,
        width: 80,
        disable: false,
      };
    })
);

items.value.unshift({
  dataIndex: '顺序',
  enable: true,
  autoWidth: false,
  width: 80,
  disable: true,
});

items.value.push({
  dataIndex: '操作',
  enable: true,
  autoWidth: false,
  width: 80,
  disable: true,
});

const checkAll = ref(false);

const indeterminate = computed(() => {
  const check = checked.value.length;
  const total = items.value.length;
  return 0 < check && check < total;
});

const checked = computed(() => {
  return items.value.filter(i => i.enable);
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
</script>

<style scoped></style>
