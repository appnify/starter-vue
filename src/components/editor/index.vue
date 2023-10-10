<template>
  <a-modal :visible="true" :fullscreen="true" :footer="false" class="ani-modal">
    <div class="w-full h-full bg-slate-100 grid grid-rows-[auto_1fr]">
      <div class="h-13 bg-white border-b border-slate-200 z-10">
        <panel-header></panel-header>
      </div>
      <div class="grid grid-cols-[auto_1fr_auto]">
        <div class="bg-white shadow-[2px_0_6px_rgba(0,0,0,.05)] z-10">
          <panel-left></panel-left>
        </div>
        <div class="w-full h-full">
          <panel-main></panel-main>
        </div>
        <div class="bg-white shadow-[-2px_0_6px_rgba(0,0,0,.05)]">
          <panel-right></panel-right>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ContextKey } from "./config";
import PanelHeader from "./panel-header/index.vue";
import PanelLeft from "./panel-left/index.vue";
import PanelMain from "./panel-main/index.vue";
import PanelRight from "./panel-right/index.vue";

const blocks = ref<Block>([]);

const current = ref({
  block: null as Block | null,
});

const container = ref<Container>({
  id: 11,
  title: "国庆节喜庆版式设计",
  description: "适用于国庆节1日-7日间上午9:00-10:00播出的版式设计",
  width: 1920,
  height: 1080,
  bgImage: "",
  bgColor: "#ffffff",
  zoom: 1,
});

const setCurrentBlock = (block: Block | null) => {
  for (const block of blocks.value) {
    block.active = false;
  }
  if (!block) {
    current.value.block = null;
    return;
  }
  block.active = true;
  current.value.block = block;
};

provide(ContextKey, {
  current,
  container,
  blocks,
  setCurrentBlock,
});
</script>

<style lang="less">
.ani-modal {
  .muti-form-item .arco-form-item .arco-form-item-label {
    color: #899;
    font-size: 12px;
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
