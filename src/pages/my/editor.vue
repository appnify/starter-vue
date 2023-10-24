<template>
  <div ref="editorRef" class="w-full h-full border"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
const editorRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  if (editorRef.value) {
    editor = monaco.editor.create(editorRef.value, {
      value: "",
      language: "html",
    });
  }
});

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

watch(
  () => props.content,
  (value) => {
    editor?.setValue(value);
  }
);
</script>

<style lang="less" scoped></style>
