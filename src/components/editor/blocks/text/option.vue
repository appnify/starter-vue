<template>
  <div>
    <base-option :data="data"></base-option>
  </div>
  <div>
    <a-divider></a-divider>
    <div class="muti-form-item grid grid-cols-2 gap-x-4">
      <a-form-item label="是否滚动">
        <a-radio-group type="button" v-model="data.data.marquee" class="!w-full">
          <a-radio :value="false">否</a-radio>
          <a-radio :value="true">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="data.data.marquee" label="滚动速度">
        <a-input-number v-model="data.data.marqueeSpeed" :min="10" :step="10"></a-input-number>
      </a-form-item>
    </div>
    <a-form-item v-if="data.data.marquee" label="滚动方向">
      <a-radio-group type="button" v-model="data.data.marqueeDirection" class="!w-full">
        <a-radio v-for="item in DirectionOptions" :key="item.value" :value="item.value" class="dir-radio">
          <i :class="item.icon"></i>
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </div>
  <a-divider :margin="0"></a-divider>
  <div>
    <div class="my-4 leading-0">
      <i class="icon-park-outline-text-style"></i>
      内容(中文)
    </div>
    <font-option :data="data.data.fontCh"></font-option>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseOption from "../../components/BaseOption.vue";
import { Block } from "../../config";
import { FontOption } from "../font";
import { DirectionOptions, TextData } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Block<TextData>>,
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
