<template>
  <a-input v-model="model" class="group w-full" allow-clear placeholder="暂无">
    <template #prefix>
      <a-link @click="visible = true">选择</a-link>
    </template>
  </a-input>
  <image-picker v-model="model" v-model:visible="visible"></image-picker>
</template>

<script setup lang="ts">
import ImagePicker from './ImagePicker.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
const visible = ref(false);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
