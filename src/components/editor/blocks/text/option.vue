<template>
  <div>
    <base-option :data="data"></base-option>
  </div>
  <a-divider></a-divider>
  <div>
    <div class="muti-form-item grid grid-cols-2 gap-x-4">
      <a-form-item label="是否滚动">
        <a-radio-group type="button" v-model="data.params.marquee" class="!w-full">
          <a-radio :value="false">否</a-radio>
          <a-radio :value="true">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :disabled="!data.params.marquee" label="滚动速度">
        <a-input-number v-model="data.params.speed" :min="10" :step="10"></a-input-number>
      </a-form-item>
    </div>
    <a-form-item :disabled="!data.params.marquee" label="滚动方向">
      <a-radio-group type="button" v-model="data.params.direction" class="!w-full">
        <a-radio v-for="item in DirectionOptions" :key="item.value" :value="item.value" class="dir-radio">
          <i :class="item.icon"></i>
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </div>
  <a-divider></a-divider>
  <font-option :data="data.params.fontCh"></font-option>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseOption from "../../components/BaseOption.vue";
import { FontOption } from "../components/font";
import { DirectionOptions, Text } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Text>,
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
../components/font