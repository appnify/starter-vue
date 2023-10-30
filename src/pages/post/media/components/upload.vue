<template>
  <a-modal v-model:visible="modal.visible" title="上传文件" title-align="start" :width="732">
    <!-- <a-alert class="mb-2"> 提示：支持大小在 1G 以内，格式为.png、.jpg、.webp、.mp4、.ogg的文件。 </a-alert> -->
    <a-upload
      ref="uploadRef"
      class="upload"
      v-model:file-list="fileList"
      :multiple="true"
      :custom-request="upload"
      :auto-upload="false"
    >
      <template #upload-button>
        <div class="mb-2 flex items-center gap-2">
          <div class="flex-1 flex gap-4">
            <a-button type="outline"> 选择文件... </a-button>
            <span class="flex items-center text-gray-400" @click.prevent.stop>
              归类为:
              <span>
                <a-select v-model="group" :bordered="false" :options="groupOptions"></a-select>
              </span>
            </span>
          </div>
        </div>
      </template>
      <template #upload-item="{ fileItem }">
        <li :key="fileItem.uid" class="flex items-center gap-2 border-b py-3">
          <div class="flex-1">
            <div class="truncate">
              {{ fileItem.name }}
            </div>
            <a-progress :percent="Math.floor(fileItem.percent * 100) / 100" :show-text="false"></a-progress>
            <div class="flex items-center justify-between gap-2 text-gray-400">
              <span class="text-xs">
                {{ numeral(fileItem.file.size).format("0.00 b") }}
              </span>
              <span class="text-xs">
                <span v-if="fileItem.status === 'uploading'"> {{ fileItem.percent * 100 }}% </span>
                <span v-if="fileItem.status === 'done'" class="text-green-500">
                  <i class="icon-park-outline-check-one"></i>
                  完成
                </span>
                <span v-if="fileItem.status === 'error'" class="text-red-500">
                  <i class="icon-park-outline-close-one"></i>
                  失败
                </span>
              </span>
            </div>
          </div>
          <div v-show="fileItem.status !== 'done'">
            <a-link v-show="fileItem.status === 'uploading'" @click="pauseItem(fileItem)">停止</a-link>
            <a-link v-show="fileItem.status === 'init'" @click="removeItem(fileItem)" status="danger">删除</a-link>
          </div>
        </li>
      </template>
    </a-upload>
    <!-- <div v-show="!fileList.length" class="h-[426px]">
      <a-empty></a-empty>
    </div> -->
    <template #footer>
      <div class="flex justify-end gap-2 items-center">
        <a-button>
          清空
        </a-button>
        <a-button type="primary" @click="startUpload">
          上传
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { api } from "@/api";
import { FileItem, RequestOption, UploadInstance } from "@arco-design/web-vue";
import axios from "axios";
import numeral from "numeral";

const uploadRef = ref<UploadInstance | null>(null);
const startUpload = () => {
  uploadRef.value?.submit();
};
const pauseItem = (fileItem: FileItem) => {
  fileItem.status;
  uploadRef.value?.abort(fileItem);
};
const removeItem = (fileItem: FileItem) => {
  const index = fileList.value.findIndex((i) => i.uid === fileItem.uid);
  console.log(fileItem, index);
  if (index > -1) {
    fileList.value.splice(index, 1);
  }
};

const fileList = ref<FileItem[]>([]);

const modal = ref({
  visible: false,
});

const group = ref("default");
const groupOptions = [
  {
    label: "默认分类",
    value: "default",
  },
  {
    label: "视频分类",
    value: "video",
  },
];

const upload = (option: RequestOption) => {
  const { fileItem, onError, onProgress, onSuccess } = option;
  const source = axios.CancelToken.source();
  if (fileItem.file) {
    api.file
      .addFile(
        {
          file: fileItem.file as any,
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

<style lang="less" scoped>
.upload :deep(.arco-upload-list) {
  height: 426px;
  overflow: auto;
}
</style>
