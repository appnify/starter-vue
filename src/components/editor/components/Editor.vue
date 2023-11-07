<template>
  <a-modal :visible="visible" :fullscreen="true" :footer="false" class="ani-modal">
    <div class="w-full h-full bg-slate-100 grid grid-rows-[auto_1fr] select-none">
      <div class="h-13 bg-white border-b border-slate-200 z-10">
        <panel-header v-model:container="container"></panel-header>
      </div>
      <div class="grid grid-cols-[auto_1fr_auto] overflow-hidden">
        <div class="h-full overflow-hidden bg-white shadow-[2px_0_6px_rgba(0,0,0,.05)] z-10">
          <panel-left @rm-block="rmBlock" @current-block="setCurrentBlock"></panel-left>
        </div>
        <div class="w-full h-full">
          <panel-main
            v-model:rightPanelCollapsed="rightPanelCollapsed"
            @add-block="addBlock"
            @current-block="setCurrentBlock"
          ></panel-main>
        </div>
        <div class="h-full overflow-hidden bg-white shadow-[-2px_0_6px_rgba(0,0,0,.05)]">
          <panel-right v-model:collapsed="rightPanelCollapsed" v-model:block="currentBlock"></panel-right>
        </div>
      </div>
    </div>
    <appnify-preview v-model:visible="preview"></appnify-preview>
  </a-modal>
</template>

<script setup lang="ts">
import { EditorKey, useEditor } from "../core";
import PanelHeader from "./PanelHeader.vue";
import PanelLeft from "./PanelLeft.vue";
import PanelMain from "./PanelMain.vue";
import PanelRight from "./PanelRight.vue";
import AppnifyPreview from "./EditorPreview.vue";

const visible = defineModel("visible", { default: false });
const rightPanelCollapsed = ref(false);
const leftPanelCollapsed = ref(false);
const preview = ref(false);
const editor = useEditor();
const { container, blocks, currentBlock, addBlock, rmBlock, setCurrentBlock } = editor;

const saveData = () => {
  const data = {
    container: container.value,
    children: blocks.value,
  };
  const str = JSON.stringify(data);
  localStorage.setItem("ANI_EDITOR_DATA", str);
};

const loadData = async () => {
  const str = localStorage.getItem("ANI_EDITOR_DATA");
  if (!str) {
    return;
  }
  const data = JSON.parse(str);
  container.value = data.container;
  blocks.value = data.children;
};

provide(EditorKey, editor);
onMounted(loadData);
</script>

<style lang="less">
.ani-modal {
  .muti-form-item .arco-form-item .arco-form-item-label {
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
../core/editor
