<template>
  <div class="flex gap-2 items-center">
    <a-avatar>
      <img v-show="file?.url" :src="file?.url" alt="" />
    </a-avatar>
    <div>
      <a-upload
        action="/"
        accept=".png,.jpg,.webp"
        :fileList="file ? [file] : []"
        :show-file-list="false"
        :custom-request="upload"
        @change="onChange"
        @progress="onProgress"
      >
        <template #upload-button>
          <a-link>选择文件</a-link>
          <a-divider direction="vertical" :margin="4"></a-divider>
          <a-link>上传文件</a-link>
        </template>
      </a-upload>
      <div class="text-gray-400 text-xs">请选择大小不超过5MB，.png, .jpg, .webp格式的图片</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RequestParams, api } from "@/api";
import { FileItem, RequestOption } from "@arco-design/web-vue";
import axios from "axios";
import { ref } from "vue";

const file = ref();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  (value) => {
    file.value = { url: value };
  }
);

const upload = (option: RequestOption) => {
  const { fileItem, onError, onProgress, onSuccess } = option;
  const source = axios.CancelToken.source();
  const send = async (file: File) => {
    const data = { file };
    const params: RequestParams = {
      onUploadProgress(e) {
        let percent = 0;
        if (e.total && e.total > 0) {
          percent = e.loaded / e.total;
        }
        onProgress(percent, e as any);
      },
      cancelToken: source.token,
    };
    try {
      const res = await api.file.addFile(data, params);
      onSuccess(res);
      console.log(res.data.data);
      emit("update:modelValue", res.data.data?.path);
    } catch (e) {
      onError(e);
    }
  };
  if (fileItem.file) {
    send(fileItem.file);
  }
  return {
    abort() {
      source.cancel();
    },
  };
};

const onChange = (_: any, currentFile: FileItem) => {
  file.value = {
    ...currentFile,
  };
};

const onProgress = (currentFile: FileItem) => {
  file.value = currentFile;
};
</script>
