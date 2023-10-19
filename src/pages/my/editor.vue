<template>
  <a-modal v-model:visible="visible" :width="1280" title="编辑代码" title-align="start" @close="onClose">
    <div class="h-[700px]">
      <div id="editor1" class="w-full h-full"></div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import ejs from "ejs";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import pageStr from "./page.ejs?raw";

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

const visible = ref(false);
let editor: monaco.editor.IStandaloneCodeEditor | undefined;
const onClose = () => {
  editor?.dispose();
};
defineExpose({
  async open() {
    visible.value = true;
    await nextTick();
    const box = document.getElementById("editor1")!;
    const code = ejs.render(pageStr, {
      tag: "user",
      operationId: "addUser",
    });
    editor = monaco.editor.create(box, {
      value: code,
      language: "html",
    });
  },
});
</script>

<style lang="less" scoped></style>
