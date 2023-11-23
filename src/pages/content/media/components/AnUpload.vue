<template>
  <a-button type="primary" @click="visible = true">
    <template #icon>
      <i class="icon-park-outline-upload"></i>
    </template>
    上传
  </a-button>
  <a-modal
    title="上传文件"
    title-align="start"
    v-model:visible="visible"
    :width="940"
    :mask-closable="false"
    :on-before-cancel="onBeforeCancel"
    @close="onClose"
  >
    <div class="flex items-center gap-4 py-0">
      <a-upload
        ref="uploadRef"
        class="upload"
        v-model:file-list="fileList"
        :multiple="true"
        :custom-request="upload"
        :auto-upload="false"
        :show-file-list="false"
        @success="onUploadSuccess"
        @error="onUploadError"
      >
        <template #upload-button>
          <a-button type="primary"> 选择文件 </a-button>
        </template>
      </a-upload>
      <div class="flex-1 flex items-center text-gray-400">
        归类为:
        <span>
          <a-select v-model="group" :bordered="false" :options="groupOptions"></a-select>
        </span>
      </div>
    </div>

    <ul v-if="fileList.length" class="h-[424px] overflow-hidden p-0 m-0">
      <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto pr-[20px] divide-y">
        <li v-for="item in fileList" :key="item.uid" class="flex items-center gap-4 py-3">
          <div class="text-4xl rounded pr-0.5 flex justify-center">
            <i :class="getIcon(item.file?.type ?? 'video')"></i>
          </div>
          <div class="flex-1 overflow-hidden">
            <div class="h-8 truncate text-slate-900 flex justify-between items-center gap-2">
              <div>
                {{ item.name }}
                <span class="text-xs text-gray-400 ml-2">{{ numeral(item.file?.size).format('0 b') }}</span>
              </div>
              <div v-show="item.status !== 'done'">
                <a-link v-show="item.status === 'uploading'" @click="pauseItem(item)">停止</a-link>
                <a-link v-show="item.status === 'error'" @click="retryItem(item)">重试</a-link>
                <a-link v-show="item.status === 'init' || item.status === 'error'" @click="removeItem(item)">
                  删除
                </a-link>
              </div>
            </div>
            <a-progress :percent="formatProgress(item, true)" :show-text="false" class="block!"></a-progress>
            <div class="flex items-center justify-between gap-2 text-gray-400 mt-1.5 text-xs">
              <span class="text-xs">
                <span v-if="item.status === 'init'">
                  <i class="icon-park-outline-hourglass-full"></i>
                  等待上传
                </span>
                <span v-else-if="item.status === 'uploading'" class="text-[rgb(var(--primary-6))]">
                  <i class="icon-park-outline-upload-one"></i>
                  正在上传
                </span>
                <span v-else-if="item.status === 'done'" class="text-[rgb(var(--success-6))]">
                  <i class="icon-park-outline-check"></i>
                  上传成功
                </span>
                <span v-else="item.status === 'error'" class="text-red-500">
                  <i class="icon-park-outline-close"></i>
                  上传失败
                </span>
              </span>
              <span>
                <span v-if="item.status === 'init'"> </span>
                <span v-else-if="item.status === 'uploading'">
                  速度：{{ formatSpeed(item.uid) }}/s, 进度：{{ formatProgress(item) }} %
                </span>
                <span v-else-if="item.status === 'done'">
                  耗时：{{ fileMap.get(item.uid)?.cost || 0 }} 秒, 平均：{{ formatAspeed(item.uid) }}/s
                </span>
                <span v-else="item.status === 'error'"> 原因：{{ fileMap.get(item.uid)?.error }} </span>
              </span>
            </div>
          </div>
        </li>
      </a-scrollbar>
    </ul>

    <div v-else class="h-[424px] flex items-center justify-center">
      <an-empty></an-empty>
    </div>

    <template #footer>
      <div class="flex justify-between gap-2 items-center">
        <div class="text-gray-400">已上传 {{ stat.doneCount }}/{{ fileList.length }} 项</div>
        <div class="space-x-2">
          <a-button type="text" :disabled="!fileList.length || Boolean(stat.uploadingCount)" @click="clearUploaded">
            清空
          </a-button>
          <a-button type="primary" :disabled="!fileList.length || !stat.initCount" @click="startUpload">
            开始上传
          </a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { RequestParams, api } from '@/api';
import { delConfirm } from '@/utils';
import { FileItem, Message, RequestOption, UploadInstance } from '@arco-design/web-vue';
import axios from 'axios';
import numeral from 'numeral';
import { getIcon } from './util';

const emit = defineEmits<{
  (event: 'success', item: FileItem): void;
  (event: 'close', count: number): void;
}>();

const visible = ref(false);
const uploadRef = ref<UploadInstance | null>(null);
const fileList = ref<FileItem[]>([]);
const fileMap = reactive<
  Map<
    string,
    {
      lastTime: number;
      lastLoaded: number;
      speed: number;
      aspeed: number;
      cost: number;
      error: string;
    } | null
  >
>(new Map());

const formatProgress = (item: FileItem, small?: boolean) => {
  let percent = Math.floor((item.percent || 0) * 100);
  percent = percent < 100 ? percent : item.response ? percent : 99;
  return small ? percent / 100 : percent;
};

const formatSpeed = (uid: string) => {
  return numeral(fileMap.get(uid)?.speed || 0).format('0 b');
};

const formatAspeed = (uid: string) => {
  return numeral(fileMap.get(uid)?.aspeed || 0).format('0 b');
};

const stat = computed(() => {
  const result = {
    initCount: 0,
    doneCount: 0,
    uploadingCount: 0,
    errorCount: 0,
  };
  for (const item of fileList.value) {
    if (item.status === 'init') result.initCount++;
    if (item.status === 'uploading') result.uploadingCount++;
    if (item.status === 'done') result.doneCount++;
    if (item.status === 'error') result.errorCount++;
  }
  return result;
});

const startUpload = () => {
  uploadRef.value?.submit();
};

const pauseItem = (item: FileItem) => {
  uploadRef.value?.abort(item);
  const file = fileMap.get(item.uid);
  if (file) {
    file.error = '手动中止';
  }
};

const removeItem = (item: FileItem) => {
  const index = fileList.value.findIndex(i => i.uid === item.uid);
  if (index > -1) {
    fileList.value.splice(index, 1);
  }
};

const retryItem = (item: FileItem) => {
  uploadRef.value?.submit(item);
};

const clearUploaded = async () => {
  if (stat.value.doneCount !== fileList.value.length) {
    await delConfirm('当前有未上传完成的文件，是否继续清空?');
  }
  fileList.value = [];
};

const onUploadSuccess = (item: FileItem) => {
  emit('success', item);
};

const onUploadError = (item: FileItem) => {
  const file = fileMap.get(item.uid);
  if (file) {
    file.error = item.response?.data?.message || '网络异常';
  }
};

const onBeforeCancel = () => {
  if (fileList.value.some(i => i.status === 'uploading')) {
    Message.warning('提示：文件上传中，请稍后再试!');
    return false;
  }
  return true;
};

const onClose = () => {
  fileMap.clear();
  fileList.value = [];
  emit('close', stat.value.doneCount);
};

const upload = (option: RequestOption) => {
  const { fileItem, onError, onProgress, onSuccess } = option;
  const source = axios.CancelToken.source();
  if (!fileMap.has(fileItem.uid)) {
    fileMap.set(fileItem.uid, {
      lastTime: Date.now(),
      lastLoaded: 0,
      cost: 0,
      speed: 0,
      aspeed: 0,
      error: '网络异常',
    });
  }
  const item = fileMap.get(fileItem.uid)!;
  const startTime = Date.now();
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
        item.aspeed = (item.speed + speed) / 2;
        item.speed = speed;
        item.lastLoaded = e.loaded;
        item.lastTime = nowTime;
      }
      onProgress(percent, e as any);
    },
    cancelToken: source.token,
  };
  const up = async () => {
    try {
      const res = await api.file.addFile(data, params);
      const currentTime = Date.now();
      item.cost = Math.floor((currentTime - startTime) / 1000);
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
const group = ref('default');
const groupOptions = [
  {
    label: '默认分类',
    value: 'default',
  },
  {
    label: '视频分类',
    value: 'video',
  },
];
</script>

<style lang="less" scoped></style>
