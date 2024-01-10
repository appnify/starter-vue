<template>
  <span v-if="!descEditing" class="inline-block leading-[32px] h-8 cursor-text" @click="onDescEdit">
    {{ modelValue }}
  </span>
  <span v-else class="inline-flex items-center" ref="inputRef">
    <a-input size="small" v-model="descContent" class="!w-96" v-bind="inputProps"></a-input>
  </span>
</template>

<script setup lang="ts">
import { Input } from '@arco-design/web-vue';
import { onClickOutside } from '@vueuse/core';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  inputProps: {
    type: Object as PropType<Partial<InstanceType<typeof Input>['$props']>>,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue']);
const descEditing = ref(false);
const descContent = ref('');
const inputRef = ref<HTMLElement | null>(null);

const onDescEdited = () => {
  emit('update:modelValue', descContent.value);
  descEditing.value = false;
};

onClickOutside(inputRef, () => {
  onDescEdited();
});

const onDescEdit = () => {
  descContent.value = props.modelValue;
  descEditing.value = true;
};
</script>

<style scoped></style>
