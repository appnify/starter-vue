<template>
  <a-modal
    v-model:visible="show"
    title="选择素材"
    title-align="start"
    :width="1080"
    :closable="false"
    :mask-closable="false"
    :draggable="true"
    :ok-button-props="{ disabled: !selected.length }"
  >
    <div class="w-full flex items-center justify-between gap-4">
      <div>
        <a-button type="outline" class="!text-gray-700 !border-gray-300">
          <template #icon>
            <i class="i-icon-park-outline-upload"></i>
          </template>
          上传
        </a-button>
      </div>
      <div>
        <a-input-search
          :disabled="loading"
          class="!w-48 mr-2"
          placeholder="请输入素材名称"
          @search="loadData"
        ></a-input-search>
      </div>
    </div>
    <a-spin :loading="loading" :dot="true" tip="加载中..." class="h-[450px] w-full">
      <div class="h-[450px] grid grid-cols-5 grid-rows-2 items-start justify-between gap-2 mt-2">
        <div
          v-for="item in images"
          :key="item.id"
          :class="{ selected: selectedKeys.includes(item.id) }"
          class="p-1 border border-transparent rounded"
          @click="onSelectedImage(item)"
        >
          <div class="w-full bg-gray-50 flex items-center justify-center">
            <img :src="item.url" class="w-full aspect-video object-cover rounded hover:opacity-80" />
          </div>
          <div class="mt-2 flex items-center gap-2">
            <div class="flex-1 truncate text-gray-600" :class="{ 'text-brand-500': selectedKeys.includes(item.id) }">
              {{ item.title }}(<span class="text-xs text-gray-400">1280 * 800</span>)
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2 flex justify-end">
        <a-pagination
          v-model:current="pagination.page"
          v-model:page-size="pagination.size"
          :total="pagination.total"
          :disabled="loading"
          @change="loadData"
          @page-size-change="loadData"
        ></a-pagination>
      </div>
    </a-spin>
    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <div>已选: {{ selected.length }} 项</div>
        <div>
          <a-button class="mr-2" @click="onClose"> 取消 </a-button>
          <a-button type="primary" @click="onBeforeOk" :disabled="!selected.length"> 确定 </a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { mockLoad } from '../utils/mock';
import { useVModel } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';

const props = defineProps({
  modelValue: {
    type: [String, Array] as PropType<string | any[]>,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  load: {
    type: Function,
    default: mockLoad,
  },
});

const emit = defineEmits(['update:modelValue', 'update:visible']);

const show = useVModel(props, 'visible', emit);
const model = useVModel(props, 'modelValue', emit);
const pagination = ref({ page: 1, size: 15, total: 0 });
const search = ref({ name: '' });
const loading = ref(false);
const images = ref<any[]>([]);
const selected = ref<any[]>([]);
const selectedKeys = computed(() => (selected.value ?? []).map(item => item.id));

const loadData = async () => {
  const { page, size } = pagination.value;
  const params = { ...search.value, page, size };
  try {
    loading.value = true;
    const { data, total } = await props.load(params);
    images.value = data;
    pagination.value.total = total;
  } finally {
    loading.value = false;
  }
};

const onBeforeOk = () => {
  model.value = props.multiple ? selected.value : selected.value[0]?.url;
  onClose();
};

const onClose = () => {
  selected.value = [];
  images.value = [];
  pagination.value.page = 1;
  pagination.value.total = 0;
  search.value.name = '';
  show.value = false;
};

const onSelectedImage = (image: any) => {
  if (selectedKeys.value.includes(image.id)) {
    selected.value = selected.value.filter(item => item.id !== image.id);
  } else {
    if (props.multiple) {
      selected.value.push(image);
    } else {
      selected.value = [image];
    }
  }
};

watch(
  () => props.visible,
  value => {
    if (value) {
      loadData();
    }
    selected.value = cloneDeep(props.multiple ? model.value : [model.value]) as any[];
  }
);
</script>

<style scoped>
.selected {
  position: relative;
  border-color: rgb(var(--primary-6));
  background-color: rgb(var(--primary-1));
  cursor: pointer;
}
.selected:after {
  content: '';
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 0;
  height: 0;
  border-bottom: 20px solid #09f;
  border-left: 20px solid transparent;
}
.selected:before {
  content: '';
  position: absolute;
  bottom: 5px;
  right: 1px;
  width: 10px;
  height: 5px;
  border: 2px solid white;
  border-top: none;
  border-right: none;
  transform: rotate(-55deg);
  z-index: 2;
}
</style>
../utils/mock
