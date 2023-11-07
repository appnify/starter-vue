<template>
  <base-option v-model="model"></base-option>
  <a-divider></a-divider>
  <font-option v-model="model.params.fontCh">
    <a-form-item label="时间格式">
      <a-auto-complete
        v-model="model.params.fontCh.content"
        :data="FomatSuguestions"
        :allow-clear="true"
        placeholder="例如 HH:mm:ss"
      >
        <template #suffix>
          <a-popover>
            <i class="icon-park-outline-info text-gray-400 cursor-pointer"></i>
            <template #content>
              <p>HH 两位数的小时, 01 到 24</p>
              <p>mm 两位数的分钟, 00 到 59</p>
              <p>ss 两位数的秒数, 00 到 59</p>
            </template>
          </a-popover>
        </template>
      </a-auto-complete>
    </a-form-item>
  </font-option>
</template>

<script setup lang="ts">
import BaseOption from "../../components/BaseOption.vue";
import { FontOption } from "../font";
import { Time, FomatSuguestions } from "./interface";

const model = defineModel<Time>({ required: true });
</script>

<style lang="less" scoped>
.dir-radio {
  .arco-radio-button-content {
    padding: 0;
  }
}
</style>
../font