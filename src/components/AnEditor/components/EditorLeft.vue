<template>
  <div class="h-full grid grid-cols-[auto_1fr]" :style="{ width: !collapsed ? '248px' : undefined }">
    <div class="h-full grid grid-rows-[1fr_auto] border-r border-slate-200">
      <a-menu
        :collapsed="true"
        :default-selected-keys="['0_0']"
        :selected-keys="[key]"
        @menu-item-click="(k) => (key = k)"
      >
        <a-menu-item key="list">
          <template #icon>
            <i class="icon-park-outline-all-application"></i>
          </template>
          组件列表
        </a-menu-item>
        <a-menu-item key="data">
          <template #icon>
            <i class="icon-park-outline-rss"></i>
          </template>
          当前组件
        </a-menu-item>
      </a-menu>
      <div class="w-full justify-center gap-1 grid text-center pb-4">
        <a-tooltip content="帮助" position="right">
          <a-button type="text">
            <template #icon>
              <i class="icon-park-outline-info text-lg text-gray-400 hover:text-gray-700"></i>
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="collapsed ? '展开' : '折叠'" position="right">
          <a-button type="text" @click="collapsed = !collapsed">
            <template #icon>
              <i
                class="text-lg text-gray-400 hover:text-gray-700"
                :class="collapsed ? 'icon-park-outline-expand-left' : 'icon-park-outline-expand-right'"
              ></i>
            </template>
          </a-button>
        </a-tooltip>
      </div>
    </div>
    <div v-show="!collapsed">
      <ul v-show="key === 'list'" class="list-none px-2 grid gap-2" @dragstart="onDragStart" @dragover.prevent>
        <li
          v-for="item in blockList"
          :key="item.type"
          :draggable="true"
          :data-type="item.type"
          class="flex items-center justify-between gap-2 bg-gray-100 text-gray-500 px-2 py-1 rounded border border-transparent cursor-move hover:bg-brand-50 hover:text-brand-500 hover:border-dashed hover:border-brand-500"
        >
          <div class="">
            <i class="text-base" :class="item.icon"></i>
          </div>
          <div class="flex-1 leading-0">
            <div class="">
              {{ item.title }}
            </div>
          </div>
        </li>
      </ul>
      <ul v-show="key === 'data'" class="list-none px-2 grid gap-2">
        <li
          v-for="item in blocks"
          :key="item.id"
          class="group h-8 w-full overflow-hidden grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-gray-100 text-gray-500 px-2 py-1 rounded border border-transparent"
          :class="{
            '!bg-brand-50': currentBlock === item,
            '!text-brand-500': currentBlock === item,
            '!border-brand-300': currentBlock === item,
          }"
          @click="emit('current-block', item)"
        >
          <div class="">
            <i class="text-base" :class="getIcon(item.type)"></i>
          </div>
          <div class="w-full select-none truncate">
            {{ item.title }}
          </div>
          <div class="w-4">
            <i
              class="!hidden !group-hover:inline-block text-gray-400 hover:text-gray-700 icon-park-outline-delete !text-xs"
              @click.prevent="emit('rm-block', item)"
            ></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIcon } from "../blocks";
import { Block, EditorKey } from "../core";

const { blocks, currentBlock, BlockerMap } = inject(EditorKey)!;
const blockList = Object.values(BlockerMap);
const collapsed = ref(false);
const key = ref<"list" | "data">("list");

const emit = defineEmits<{
  (event: "rm-block", block: Block): void;
  (event: "current-block", block: Block | null): void;
}>();

/**
 * 拖拽开始时设置数据
 */
const onDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData("type", (e.target as HTMLElement).dataset.type!);
};
</script>

<style scoped></style>
../core../core/editor
