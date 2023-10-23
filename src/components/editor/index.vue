<template>
  <a-modal :visible="true" :fullscreen="true" :footer="false" class="ani-modal">
    <div class="w-full h-full bg-slate-100 grid grid-rows-[auto_1fr] select-none">
      <div class="h-13 bg-white border-b border-slate-200 z-10">
        <panel-header></panel-header>
      </div>
      <div class="grid grid-cols-[auto_1fr_auto] overflow-hidden">
        <div class="h-full overflow-hidden bg-white shadow-[2px_0_6px_rgba(0,0,0,.05)] z-10">
          <panel-left></panel-left>
        </div>
        <div class="w-full h-full">
          <panel-main></panel-main>
        </div>
        <div class="h-full overflow-hidden bg-white shadow-[-2px_0_6px_rgba(0,0,0,.05)]">
          <panel-right></panel-right>
        </div>
      </div>
    </div>
    <appnify-preview v-model:visible="preview"></appnify-preview>
  </a-modal>
</template>

<script setup lang="ts">
import { Block, Container, ContextKey, ReferenceLine } from "./config";
import PanelHeader from "./panel-header/index.vue";
import PanelLeft from "./panel-left/index.vue";
import PanelMain from "./panel-main/index.vue";
import PanelRight from "./panel-right/index.vue";
import AppnifyPreview from "./preview/index.vue";

const preview = ref(false);

/**
 * 运行时上下文
 */
const current = ref({
  block: null as Block | null,
  rightPanelCollapsed: false,
});

/**
 * 组件列表
 */
const blocks = ref<Block[]>([]);

/**
 * 参考线
 */
const refLine = new ReferenceLine(blocks, current);

/**
 * 画布容器
 */
const container = ref<Container>({
  id: 11,
  title: "国庆节喜庆版式设计",
  description: "适用于国庆节1日-7日间上午9:00-10:00播出的版式设计",
  x: 0,
  y: 0,
  zoom: 0.7,
  width: 1920,
  height: 1080,
  bgImage: "",
  bgColor: "#ffffff",
});

onMounted(() => {
  loadData();
});

/**
 * 保存数据
 */
const saveData = () => {
  const data = {
    container: container.value,
    children: blocks.value,
  };
  const str = JSON.stringify(data);
  localStorage.setItem("ANI_EDITOR_DATA", str);
};

/**
 * 加载数据
 */
const loadData = async () => {
  const str = localStorage.getItem("ANI_EDITOR_DATA");
  if (!str) {
    return;
  }
  const data = JSON.parse(str);
  container.value = data.container;
  blocks.value = data.children;
};

/**
 * 设置当前选中的组件
 */
const setCurrentBlock = (block: Block | null) => {
  for (const block of blocks.value) {
    block.actived = false;
  }
  if (!block) {
    current.value.block = null;
    return;
  }
  block.actived = true;
  current.value.block = block;
};

/**
 * 恢复画布到原始比例和远点
 */
const setContainerOrigin = () => {
  container.value.x = 0;
  container.value.y = 0;
  const el = document.querySelector(".juetan-editor-container");
  if (el) {
    const { width, height } = el.getBoundingClientRect();
    const wZoom = width / container.value.width;
    const hZoom = height / container.value.width;
    const zoom = Math.floor((wZoom > hZoom ? wZoom : hZoom) * 10000) / 10000;
    container.value.zoom = zoom;
  }
};

/**
 * 提供上下文注入
 */
provide(ContextKey, {
  current,
  container,
  blocks,
  refLine,
  setCurrentBlock,
  setContainerOrigin,
  loadData,
  saveData,
  preview() {
    preview.value = true;
  },
});
</script>

<style lang="less">
.ani-modal {
  .muti-form-item .arco-form-item .arco-form-item-label {
    // color: #899;
    // font-size: 12px;
    line-height: 1;
  }
  .arco-modal-fullscreen {
    display: block;
    height: 100%;
  }
  .arco-modal-header {
    display: none;
  }
  .arco-modal-body {
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .arco-tabs-nav-vertical .arco-tabs-nav-ink {
    display: none;
  }
  .arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab {
    padding: 4px;
  }
  .arco-form-item-content-flex {
    display: block;
  }
  .arco-divider-text-left {
    left: 0;
    padding-left: 0;
  }
}
</style>
