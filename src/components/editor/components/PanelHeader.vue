<template>
  <div class="h-full flex items-center justify-between px-4">
    <div class="text-base group">
      <a-tag :color="container.id ? 'blue' : 'green'" bordered class="mr-2">
        {{ container.id ? "修改" : "新增" }}
      </a-tag>
      <ani-texter v-model="container.title"></ani-texter>
    </div>
    <div class="flex gap-2">
      <a-button> 导出 </a-button>
      <a-button> 设置 </a-button>
      <a-dropdown-button type="primary" @click="onSaveData">
        保存
        <template #content>
          <a-doption>保存为JSON</a-doption>
          <a-doption>保存为图片</a-doption>
        </template>
      </a-dropdown-button>
      <a-button type="outline" status="danger">退出</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { Container } from "../core";
import AniTexter from "./InputTexter.vue";

const onSaveData = () => {
  Message.success("保存成功");
};

const container = defineModel<Container>("container", { required: true });
</script>

<style scoped></style>
../core
