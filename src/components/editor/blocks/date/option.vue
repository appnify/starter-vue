<template>
  <base-option :data="data"></base-option>
  <a-divider></a-divider>
  <font-option :data="data.params.fontCh">
    <a-form-item label="日期格式">
      <a-auto-complete
        v-model="data.params.fontCh.content"
        :data="FomatSuguestions"
        :allow-clear="true"
        placeholder="例如 HH:mm:ss"
      >
        <template #suffix>
          <a-popover>
            <i class="icon-park-outline-info text-gray-400 cursor-pointer"></i>
            <template #content>
              <p>YYYY 4位数的年数, 例如： 2020</p>
              <p>MM 2位数的月份, 例如： 01</p>
              <p>DD 2位数的天数, 例如： 02</p>
            </template>
          </a-popover>
        </template>
      </a-auto-complete>
    </a-form-item>
  </font-option>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseOption from "../../components/BaseOption.vue";
import { FontOption } from "../components/font";
import { Date, FomatSuguestions } from "./interface";

defineProps({
  data: {
    type: Object as PropType<Date>,
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
