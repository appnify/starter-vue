<template>
  <teleport to="body">
    <div v-if="show" ref="viewRef" class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,.6)]">
      <div ref="headerRef" class="absolute top-0 left-0 w-full flex items-center justify-between gap-4 bg-[rgba(0,0,0,.3)] h-14 px-6 text-white">
        <div>
          <button @click="onBack" class="select-none bg-transparent text-white h-8 px-2 rounded hover:bg-[rgba(255,255,255,.1)] cursor-pointer">
            <i class="i-icon-park-outline-back mr-1"></i>
            返回
          </button>
          <span class="mx-2">|</span>
          <span class="ml-2 text-base">
            <slot name="name">
              <i :class="typeIcon"></i>
              <span class="ml-2">{{ name }}</span>
            </slot>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button v-if="download" class="bg-transparent text-white h-8 px-3 rounded hover:bg-[rgba(255,255,255,.1)]">
            <i class="i-icon-park-outline-download mr-1"></i>
            <span>下载</span>
          </button>
          <button class="bg-transparent text-white text-xl w-8 h-8 rounded hover:bg-[rgba(255,255,255,.1)]">
            <i class="i-icon-park-outline-more-one"></i>
          </button>
        </div>
      </div>
      <div>
        <div v-if="type === ViewType.VIDEO" ref="videoRef" class="w-[1280px]"></div>
        <div v-else-if="type === ViewType.TEXT" class="w-[1280px] h-[600px] bg-[rgba(0,0,0,.1)] text-white leading-8">
          <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto">
            <div class="py-4 px-5">
              {{ url }}
            </div>
          </a-scrollbar>
        </div>
        <div v-else-if="type === ViewType.IMAGE">
          <img :src="url" :alt="name" />
        </div>
        <div v-else-if="type === ViewType.AUDIO">
          <div class="audio-player flex items-center gap-4 bg-[rgba(255,255,255,.1)] text-white px-4 py-4">
            <div @click="playing = !playing" class="hover:bg-[rgba(255,255,255,.1)] h-8 px-1.5 flex items-center justify-center rounded">
              <i v-if="playing" class="text-xl i-icon-park-outline-pause-one"></i>
              <i v-else class="text-xl i-icon-park-outline-play"></i>
            </div>
            <div>
              {{ currentFormated }}
            </div>
            <div class="w-96">
              <audio ref="audioRef" :src="url" class="hidden" @timeupdate="onTimeUpdate"></audio>
              <a-slider class="block!"></a-slider>
            </div>
            <div>
              {{ durationFormated }}
            </div>
            <div class="dd">
              <a-popover>
                <div @click="onMuteToggle" class="text-xl hover:bg-[rgba(255,255,255,.1)] h-8 px-1.5 flex items-center justify-center rounded">
                  <i :class="volumeIcon"></i>
                </div>
                <template #content>
                  <div class="flex flex-col items-center">
                    <div class="w-6 text-center">
                      {{ volume }}
                    </div>
                    <a-slider class="min-w-auto!" v-model="volume" direction="vertical"></a-slider>
                  </div>
                </template>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="w-96 text-center bg-[rgba(0,0,0,.1)] text-white px-4 py-8">
            <div class="">暂不支持该文件类型的预览</div>
            <div v-if="download" class="mt-4">
              <button class="text-white h-8 px-3 rounded bg-[rgba(255,255,255,.1)] hover:bg-[rgba(255,255,255,.2)]">
                <i class="i-icon-park-outline-download mr-1"></i>
                <span>下载文件</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-20"></div>
    </div>
  </teleport>
</template>

<script setup lang="tsx">
import { getIcon } from '@/pages/content/components/util';
import { useVModel } from '@vueuse/core';
import DPlayer from 'dplayer';
import numeral from 'numeral';
import { PropType } from 'vue';

enum ViewType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'text' | 'image' | 'audio' | 'video'>,
  },
  url: {
    type: String,
  },
  download: {
    type: String,
  },
  name: {
    type: String,
    default: '失落的海峡.mp4',
  },
});

let dplayer: any;
const emit = defineEmits(['update:visible']);
const show = useVModel(props, 'visible', emit);
const headerRef = ref<HTMLElement | null>(null);
const viewRef = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const audioRef = ref<HTMLAudioElement | null>(null);
const onBack = () => (show.value = false);
const playing = ref(true);
const volume = ref(50);
const volumeLast = ref(50);
const current = ref(18);
const duration = ref(120);

const currentFormated = computed(() => numeral(current.value).format('0:00'));
const durationFormated = computed(() => numeral(duration.value).format('0:00'));

const volumeIcon = computed(() => {
  if (volume.value <= 0) {
    return 'i-icon-park-outline-volume-mute';
  } else if (volume.value <= 50) {
    return 'i-icon-park-outline-volume-small';
  } else {
    return 'i-icon-park-outline-volume-notice';
  }
});

const onTimeUpdate = (e: Event) => {};

const playAudio = async () => {
  await nextTick();
  duration.value = audioRef.value?.duration ?? 0;
};

const typeIcon = computed(() => {
  return getIcon(props.type ?? 'text');
});

const onMuteToggle = () => {
  if (volume.value === 0) {
    volume.value = volumeLast.value;
  } else {
    volumeLast.value = volume.value;
    volume.value = 0;
  }
};

const initClickOutside = async () => {
  await nextTick();
  viewRef.value?.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target?.contains(headerRef.value)) {
      return;
    }
    show.value = false;
  });
};

const loadVideo = async () => {
  if (dplayer) {
    dplayer.destroy();
  }
  await nextTick();
  if (!videoRef.value) {
    return;
  }
  dplayer = new DPlayer({
    container: videoRef.value,
    video: {
      url: props.url,
    },
    context: [],
  });
};

watch(
  () => props.visible,
  val => {
    if (!val) {
      dplayer?.destroy();
      return;
    }
    if (props.type === ViewType.VIDEO) {
      loadVideo();
    } else if (props.type === ViewType.AUDIO) {
      playAudio();
    }
  },
  {
    immediate: true,
  },
);
</script>

<style scoped></style>
@/pages/content/material/util@/pages/content/components/util
