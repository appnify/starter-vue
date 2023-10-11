<template>
  <base-option :data="data"></base-option>
  <a-divider></a-divider>
  <font-option :data="data.data.fontCh">
    <template #content>
      <a-form-item label="时间格式">
        <a-input v-model="data.data.fontCh.content" placeholder="例如 HH:mm:ss"></a-input>
      </a-form-item>
    </template>
  </font-option>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseOption from "../../components/BaseOption.vue";
import { Block } from "../../config";
import { FontOption } from "../font";
import { TimeData } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Block<TimeData>>,
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
