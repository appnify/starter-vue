<template>
  <a-modal
    v-model:visible="visible"
    title="上传文件"
    title-align="start"
    :width="820"
    :mask-closable="false"
    :on-before-cancel="onBeforeCancel"
    @close="onClose"
  >
    <div class="mb-2 flex items-center gap-4">
      <a-upload
        ref="uploadRef"
        class="upload"
        v-model:file-list="fileList"
        :multiple="true"
        :custom-request="upload"
        :auto-upload="false"
        :show-file-list="false"
        @success="onUploadSuccess"
      >
        <template #upload-button>
          <a-button type="outline"> 选择文件 </a-button>
        </template>
      </a-upload>
      <div class="flex-1 flex items-center text-gray-400">
        归类为:
        <span>
          <a-select v-model="group" :bordered="false" :options="groupOptions"></a-select>
        </span>
      </div>
    </div>

    <ul v-if="fileList.length" class="h-[400px] divide-y overflow-hidden p-0 m-0">
      <li v-for="item in fileList" :key="item.uid" class="flex items-center gap-2 py-3">
        <div class="flex-1 overflow-hidden">
          <div class="truncate text-slate-900">
            {{ item.name }}
          </div>
          <div class="flex items-center justify-between gap-2 text-gray-400 mb-[-4px]">
            <span class="text-xs text-gray-400">
              {{ numeral(item.file?.size).format("0 b") }}
            </span>
            <span class="text-xs">
              <span v-if="item.status === 'init'"> </span>
              <span v-else-if="item.status === 'uploading'">
                <span class="text-xs">
                  {{ Math.floor((item.percent || 0) * 100) }}%(
                  {{ numeral(itemMap.get(item.uid)?.speed || 0).format("0 b") }}/s )
                </span>
              </span>
              <span v-else-if="item.status === 'done'" class="text-green-600"> 完成 </span>
              <span v-else="item.status === 'error'" class="text-red-500"> 失败 </span>
            </span>
          </div>
          <a-progress :percent="Math.floor((item.percent || 0) * 100) / 100" :show-text="false"></a-progress>
        </div>
        <div v-show="item.status !== 'done'">
          <a-link v-show="item.status === 'uploading'" @click="pauseItem(item)">停止</a-link>
          <a-link v-show="item.status === 'error'" @click="retryItem(item)">重试</a-link>
          <a-link v-show="item.status === 'init' || item.status === 'error'" @click="removeItem(item)">删除</a-link>
        </div>
      </li>
    </ul>

    <div v-else class="h-[400px] flex items-center justify-center">
      <a-empty description="选择文件后显示"></a-empty>
    </div>

    <template #footer>
      <div class="flex justify-between gap-2 items-center">
        <div class="text-gray-400 text-xs">已上传 {{ successCount }} 项</div>
        <div class="space-x-2">
          <a-button
            type="text"
            :disabled="!fileList.length || !fileList.some((i) => i.status === 'done')"
            @click="clearUploaded"
          >
            清空已上传
          </a-button>
          <a-button
            type="primary"
            :disabled="!fileList.length || !fileList.some((i) => i.status === 'init')"
            @click="startUpload"
          >
            开始上传
          </a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { RequestParams, api } from "@/api";
import { FileItem, Message, RequestOption, UploadInstance } from "@arco-design/web-vue";
import axios from "axios";
import numeral from "numeral";

const emit = defineEmits<{
  (event: "success", item: FileItem): void;
  (event: "close", count: number): void;
}>();

const visible = ref(false);
const uploadRef = ref<UploadInstance | null>(null);
const successCount = ref(0);
const fileList = ref<FileItem[]>([]);
const itemMap = reactive<Map<string, { lastTime: number; lastLoaded: number; speed: number } | null>>(new Map());

/**
 * 开始上传
 */
const startUpload = () => {
  uploadRef.value?.submit();
};

/**
 * 中止上传
 * @param item 文件
 */
const pauseItem = (item: FileItem) => {
  uploadRef.value?.abort(item);
};

/**
 * 移除文件
 * @param item 文件
 */
const removeItem = (item: FileItem) => {
  const index = fileList.value.findIndex((i) => i.uid === item.uid);
  if (index > -1) {
    fileList.value.splice(index, 1);
  }
};

/**
 * 重新上传
 * @param item 文件
 */
const retryItem = (item: FileItem) => {
  uploadRef.value?.submit(item);
};

/**
 * 清空已上传
 */
const clearUploaded = () => {
  fileList.value = fileList.value.filter((i) => i.status !== "done");
};

/**
 * 上传成功后处理
 * @param item 文件
 */
const onUploadSuccess = (item: FileItem) => {
  successCount.value += 1;
  emit("success", item);
};

/**
 * 关闭前检测
 */
const onBeforeCancel = () => {
  if (fileList.value.some((i) => i.status === "uploading")) {
    Message.warning("提示：文件上传中，请稍后再试!");
    return false;
  }
  return true;
};

/**
 * 关闭后处理
 */
const onClose = () => {
  fileList.value = [];
  emit("close", successCount.value);
};

/**
 * 自定义上传逻辑
 * @param option
 */
const upload = (option: RequestOption) => {
  const { fileItem, onError, onProgress, onSuccess } = option;
  const source = axios.CancelToken.source();
  if (!itemMap.has(fileItem.uid)) {
    itemMap.set(fileItem.uid, {
      lastTime: Date.now(),
      lastLoaded: 0,
      speed: 0,
    });
  }
  const item = itemMap.get(fileItem.uid)!;
  const up = async () => {
    const data = { file: fileItem.file as any };
    const params: RequestParams = {
      onUploadProgress(e) {
        let percent = 0;
        const { lastTime, lastLoaded } = item;
        if (e.total && e.total > 0) {
          percent = e.loaded / e.total;
          const nowTime = Date.now();
          const diff = (e.loaded - lastLoaded) / (nowTime - lastTime);
          const speed = Math.floor(diff * 1000);
          item.speed = speed;
          item.lastLoaded = e.loaded;
          item.lastTime = nowTime;
        }
        onProgress(percent, e as any);
      },
      cancelToken: source.token,
    };
    try {
      const res = await api.file.addFile(data, params);
      itemMap.delete(fileItem.uid);
      onSuccess(res);
    } catch (e) {
      onError(e);
    }
  };
  if (fileItem.file) {
    up();
  }
  return {
    abort() {
      source.cancel();
    },
  };
};

defineExpose({
  open: () => {
    visible.value = true;
  },
});

// TODO
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
</script>

<style lang="less" scoped></style>
