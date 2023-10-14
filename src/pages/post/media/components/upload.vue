<template>
  <a-modal v-model:visible="modal.visible" title="上传文件" title-align="start" :footer="false">
    <a-upload :custom-request="upload" draggable action="/api/v1/upload"></a-upload>
  </a-modal>
</template>

<script setup lang="ts">
import { api } from "@/api";
import { RequestOption } from "@arco-design/web-vue";
import axios from "axios";

const modal = ref({
  visible: false,
});

const upload = (option: RequestOption) => {
  const { fileItem, onError, onProgress, onSuccess } = option;
  const source = axios.CancelToken.source();
  if (fileItem.file) {
    api.upload
      .addFile(
        {
          file: fileItem.file,
        },
        {
          onUploadProgress(e) {
            let percent = 0;
            if (e.total && e.total > 0) {
              percent = e.loaded / e.total;
            }
            onProgress(percent, e as any);
          },
          cancelToken: source.token,
        }
      )
      .then((res) => {
        onSuccess(res);
      })
      .catch((e) => {
        onError(e);
      });
  }
  return {
    abort() {
      source.cancel();
    },
  };
};

defineExpose({
  open: () => {
    modal.value.visible = true;
  },
});
</script>

<style scoped></style>
