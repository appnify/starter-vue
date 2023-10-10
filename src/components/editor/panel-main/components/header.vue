<template>
  <div class="h-full flex items-center justify-between gap-4 px-4 bg-white">
    <div class="flex-1">
      <div class="group">
        <span class="text-gray-400">描述: </span>
        <span v-if="!descEditing">
          {{ container.description }}
          <i
            class="!hidden !group-hover:inline-block icon-park-outline-edit text-gray-400 hover:text-gray-700 ml-1 cursor-pointer"
            @click="onDescEdit"
          ></i>
        </span>
        <span v-else class="inline-flex items-center">
          <a-input size="small" v-model="descContent" class="!w-96"></a-input>
          <a-button type="text" size="small" @click="onDescEdited" class="ml-2">
            <template #icon>
              <i class="icon-park-outline-check"></i>
            </template>
          </a-button>
          <a-button type="text" size="small" class="!text-gray-500" @click="descEditing = false">
            <template #icon>
              <i class="icon-park-outline-close"></i>
            </template>
          </a-button>
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <span class="text-gray-400 text-xs mr-2">
        尺寸：
        <span class="text-gray-700"> {{ container.width }} * {{ container.height }} </span>
      </span>
      <span class="text-gray-400 text-xs mr-2">
        比例：
        <span class="text-gray-700">
          {{ parseInt(container.zoom * 100) }}%
        </span>
      </span>
      <span class="text-gray-400 text-xs mr-2">
        组件：
        <span class="text-gray-700">{{ 2 }} 个</span>
      </span>
      <a-tooltip content="预览" position="bottom">
        <a-button type="text">
          <template #icon>
            <i class="icon-park-outline-play text-base !text-gray-600"></i>
          </template>
        </a-button>
      </a-tooltip>
      <a-popover position="br" trigger="click">
        <a-button type="text">
          <template #icon>
            <i class="icon-park-outline-config text-base !text-gray-600"></i>
          </template>
        </a-button>
        <template #content>
          <span>
            背景图片:
            <a-link>选择</a-link>
          </span>
          <span class="inline-flex items-center">
            背景颜色：
            <color-picker></color-picker>
          </span>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  container: {
    type: Object as PropType<any>,
    required: true,
  },
});

const descEditing = ref(false);
const descContent = ref("");

const onDescEdited = () => {
  props.container.description = descContent.value;
  descEditing.value = false;
};

const onDescEdit = () => {
  descContent.value = props.container.description;
  descEditing.value = true;
};
</script>

<style scoped></style>
