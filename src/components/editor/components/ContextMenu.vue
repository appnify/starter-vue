<template>
  <div
    ref="menuRef"
    class="me-contextmenu"
    :style="{
      display: show ? 'grid' : 'none',
      left: x + 'px',
      top: y + 'px',
    }"
    @contextmenu.prevent
  >
    <ContextMenuList v-bind="props" @done="emit('done')" />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, ref, PropType } from 'vue';
import ContextMenuList from './ContextMenuList.vue';
import { onClickOutside, useVModel } from '@vueuse/core';

defineOptions({
  name: 'ContextMenu',
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  items: {
    type: Array as PropType<any[]>,
  },
});

const emit = defineEmits(['done', 'update:visible']);
const show = useVModel(props, 'visible', emit);
const menuRef = ref<HTMLDivElement | null>(null);

onClickOutside(menuRef, () => {
  show.value = false;
});

const onClick = (e: Event) => {
  if (menuRef.value?.contains(e.target as Node)) {
    return;
  }
  emit('done');
};

onMounted(() => {
  document.addEventListener('click', onClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onClick);
});
</script>

<style>
.me-contextmenu {
  display: grid;
  gap: 4px;
  position: absolute;
  top: 20px;
  left: 20px;
  min-width: 256px;
  background: #fff;
  padding: 6px 0;
  border-radius: 4px;
  user-select: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}
</style>
