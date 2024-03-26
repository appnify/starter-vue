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
            <i class="i-icon-park-outline-info text-gray-400 cursor-pointer"></i>
            <template #content>
              <div class="w-48">
                <div class="mb-2">语法：</div>
                <div>HH: 01 ~ 24</div>
                <div>mm: 00 ~ 59</div>
                <div>ss: 00 ~ 59</div>
              </div>
            </template>
          </a-popover>
        </template>
      </a-auto-complete>
    </a-form-item>
  </font-option>
</template>

<script setup lang="ts">
import BaseOption from '../../components/BaseOption.vue';
import { FontOption } from '../font';
import { Time, FomatSuguestions } from './interface';

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
