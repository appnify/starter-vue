<template>
  <span v-if="!descEditing">
    {{ modelValue }}
    <i
      class="!hidden !group-hover:inline-block icon-park-outline-edit text-gray-400 hover:text-gray-700 ml-1 cursor-pointer"
      @click="onDescEdit"
    ></i>
  </span>
  <span v-else class="inline-flex items-center">
    <a-input size="small" v-model="descContent" class="!w-96" v-bind="inputProps"></a-input>
    <a-button type="text" size="small" @click="onDescEdited" class="ml-2">
      <template #icon>
        <i class="icon-park-outline-check"></i>
      </template>
    </a-button>
    <a-button type="text" size="small" class="!text-gray-500" @click="descEditing = false">
      <template #icon>
        <i class="icon-park-outline-close"></i>
      </template>
    </a-button>
  </span>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Input } from "@arco-design/web-vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  inputProps: {
    type: Object as PropType<Partial<InstanceType<typeof Input>["$props"]>>,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);
const descEditing = ref(false);
const descContent = ref("");

const onDescEdited = () => {
  emit("update:modelValue", descContent.value);
  descEditing.value = false;
};

const onDescEdit = () => {
  descContent.value = props.modelValue;
  descEditing.value = true;
};
</script>

<style scoped></style>
