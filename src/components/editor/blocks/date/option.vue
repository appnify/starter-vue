<template>
  <base-option :data="data"></base-option>
  <font-option :data="data.data.fontCh"></font-option>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseOption from "../../components/BaseOption.vue";
import { Block } from "../../config";
import { FontOption } from "../font";
import { DateData } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Block<DateData>>,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.dir-radio {
  .arco-radio-button-content {
    padding: 0;
  }
}
</style>
