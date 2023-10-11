<template>
  <div class="w-full h-full table overflow-hidden" :style="style">
    <div class="table-cell break-all" :style="{ verticalAlign: style.verticalAlign }">
      <slot>
        {{ data.content }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { Font, getFontStyle } from "./interface";

const props = defineProps({
  data: {
    type: Object as PropType<Font>,
    required: true,
  },
});

const style = computed(() => {
  return getFontStyle(props.data);
});
</script>

<style scoped></style>
./types
