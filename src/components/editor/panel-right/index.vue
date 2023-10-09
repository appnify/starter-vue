<template>
  <div class="w-[248px] overflow-hidden p-3">
    <a-radio-group type="button" class="w-full mb-2">
      <a-radio value="1">基本</a-radio>
      <a-radio value="2">字体</a-radio>
    </a-radio-group>
    <a-form :model="block" layout="vertical">
      <div class="muti-form-item mt-2">
        <block-attr :block="item"></block-attr>
      </div>
      <div class="muti-form-item">
        <text-attr :block="block.textStyle"></text-attr>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import BlockAttr from "./block-attr.vue";
import TextAttr from "./text-attr.vue";

const item = ref({
  x: 0,
  y: 0,
  w: 200,
  h: 100,
  bgColor: "#0099ff",
  xFixed: false,
  yFixed: false,
  resizable: true,
  draggable: true,
});

const block = ref({
  x: 10,
  y: 19,
  w: 20,
  h: 5,
  volume: 39,
  textStyle: {
    family: "simsun",
    bold: false,
    italic: false,
    underline: false,
    size: 14,
    color: "#33cc99",
    align: 3,
  },
  meta: {
    vFixed: false,
    hFixed: false,
  },
});
</script>

<style scoped></style>
