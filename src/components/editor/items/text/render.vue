<template>
  <div class="w-full h-full table overflow-hidden" :style="style">
    <div class="table-cell break-all" :style="{ verticalAlign: style.verticalAlign }">
      <slot>
        {{ data.text }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Text } from "./index.ts";

const props = defineProps({
  data: {
    type: Object as PropType<Text>,
    required: true,
  },
});

const style = computed(() => {
  const { size, family, color, bold, italic, underline, align } = props.data;

  let textAlign = "left";
  let verticalAlign = "middle";
  switch (align) {
    case 1:
      textAlign = "center";
      verticalAlign = "top";
      break;
    case 2:
      textAlign = "center";
      verticalAlign = "bottom";
      break;
    case 3:
      textAlign = "center";
      verticalAlign = "middle";
      break;
    case 4:
      textAlign = "left";
      verticalAlign = "middle";
      break;
    case 5:
      textAlign = "right";
      verticalAlign = "middle";
      break;
    default:
      break;
  }

  return {
    fontFamily: family,
    fontSize: size + "px",
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    color,
    textAlign,
    verticalAlign,
  };
});
</script>

<style scoped></style>
