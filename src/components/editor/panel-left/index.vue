<template>
  <div class="h-full grid grid-cols-[auto_1fr]" :style="{ width: !collapsed ? '248px' : undefined }">
    <div class="h-full grid grid-rows-[1fr_auto] border-r border-slate-200">
      <a-menu :collapsed="true" :default-selected-keys="['0_0']">
        <a-menu-item key="0_0">
          <template #icon>
            <i class="icon-park-outline-all-application"></i>
          </template>
          组件列表
        </a-menu-item>
        <a-menu-item key="0_1">
          <template #icon>
            <i class="icon-park-outline-rss"></i>
          </template>
          当前组件
        </a-menu-item>
      </a-menu>
      <div  class="w-full justify-center gap-1 grid text-center pb-4">
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
      <ul class="list-none px-2 grid gap-2" @dragstart="onDragStart" @dragover="onDragOver">
        <li v-for="i in 10" class="flex items-center justify-between gap-2 border border-slate-200 text-gray-500 px-2 py-1 rounded cursor-move"
          :draggable="true"
          :data-type="'text'"
        >
          <div class="">
            <i class="icon-park-outline-pic text-base text-gray-500"></i>
          </div>
          <div class="flex-1 leading-0">
            <div class="">图片</div>
            <!-- <div class="text-xs text-gray-400 mt-1">image</div> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const collapsed = ref(false);

const onDragStart = (e: DragEvent) => {
  console.log('start');
  e.dataTransfer?.setData("type", (e.target as HTMLElement).dataset.type!);
}

const onDragOver = (e: Event) => {
  console.log('over');
  e.preventDefault();
}
</script>

<style scoped></style>
