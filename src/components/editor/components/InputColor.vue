<template>
  <a-input v-model="model">
    <template #prefix>
      <color-picker v-model="model"></color-picker>
    </template>
  </a-input>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
