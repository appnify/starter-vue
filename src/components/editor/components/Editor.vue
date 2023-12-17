<template>
  <a-modal
    v-model:visible="show"
    mask-animation-name=""
    modal-animation-name=""
    :fullscreen="true"
    :footer="false"
    class="ani-modal"
  >
    <div class="w-full h-full bg-slate-100 grid grid-rows-[auto_1fr] select-none">
      <div class="h-13 bg-white border-b border-slate-200 z-10">
        <EditorHeader
          v-model:container="container"
          :saving="saving"
          @preview="showPreview = true"
          @config="showConfig = true"
          @exit="onExit()"
          @save="saveData()"
        ></EditorHeader>
      </div>
      <div class="grid grid-cols-[auto_1fr_auto] overflow-hidden">
        <div class="h-full overflow-hidden bg-white shadow-[2px_0_6px_rgba(0,0,0,.05)] z-10">
          <EditorLeft @rm-block="rmBlock" @current-block="setCurrentBlock"></EditorLeft>
        </div>
        <div class="w-full h-full">
          <EditorMain
            v-model:rightPanelCollapsed="rightPanelCollapsed"
            @add-block="addBlock"
            @current-block="setCurrentBlock"
            @block-menu="onBlockContextMenu"
          ></EditorMain>
        </div>
        <div class="h-full overflow-hidden bg-white shadow-[-2px_0_6px_rgba(0,0,0,.05)]">
          <EditorRight v-model:collapsed="rightPanelCollapsed" v-model:block="currentBlock"></EditorRight>
        </div>
      </div>
    </div>
    <EditorPreview v-model:visible="showPreview" :container="container" :blocks="blocks"></EditorPreview>
    <EditorSetting v-model:visible="showConfig" v-model="container"></EditorSetting>
    <ContextMenu
      v-model:visible="blockMenu.show"
      :x="blockMenu.x"
      :y="blockMenu.y"
      :items="blockMenuItems"
      @done="blockMenu.show = false"
    ></ContextMenu>
  </a-modal>
</template>

<script setup lang="ts">
import { delConfirm, sleep } from '@/utils';
import { Message } from '@arco-design/web-vue';
import { useVModel } from '@vueuse/core';
import { Block, ContextMenuItem, EditorKey, useEditor } from '../core';
import ContextMenu from './ContextMenu.vue';
import EditorSetting from './EditorConfig.vue';
import EditorHeader from './EditorHeader.vue';
import EditorLeft from './EditorLeft.vue';
import EditorMain from './EditorMain.vue';
import EditorPreview from './EditorPreview.vue';
import EditorRight from './EditorRight.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);
const show = useVModel(props, 'visible', emit);
const rightPanelCollapsed = ref(false);
const showPreview = ref(false);
const showConfig = ref(false);
const saving = ref(false);
const editor = useEditor();
const { container, blocks, currentBlock, addBlock, rmBlock, setCurrentBlock } = editor;

const blockMenu = reactive<{ show: boolean; x: number; y: number; block: Block | null }>({
  show: false,
  x: 0,
  y: 0,
  block: null,
});

const blockMenuItems: ContextMenuItem[] = [
  {
    name: '删除',
    icon: 'icon-park-outline-delete',
    class: 'text-red-500',
    async onClick() {
      await delConfirm({
        content: '确定删除该组件吗?',
        okText: '确定删除',
      });
      if (blockMenu.block) {
        rmBlock(blockMenu.block);
      }
    },
  },
];

const onBlockContextMenu = (block: Block, e: MouseEvent) => {
  blockMenu.x = e.clientX;
  blockMenu.y = e.clientY;
  blockMenu.block = block;
  blockMenu.show = true;
};

const saveData = async () => {
  const data = {
    container: container.value,
    children: blocks.value,
  };
  saving.value = true;
  await sleep(3000);
  saving.value = false;
  const str = JSON.stringify(data);
  localStorage.setItem('ANI_EDITOR_DATA', str);
  Message.success('提示：保存成功');
};

const loadData = async () => {
  const str = localStorage.getItem('ANI_EDITOR_DATA');
  if (!str) {
    return;
  }
  const data = JSON.parse(str);
  container.value = data.container;
  blocks.value = data.children;
};

const onExit = async () => {
  await delConfirm({
    content: '可能有尚未保存的修改，是否确定退出?',
    okText: '确定退出',
  });

  show.value = false;
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
