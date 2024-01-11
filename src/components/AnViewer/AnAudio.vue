<template>
  <div class="audio-player flex items-center gap-4 bg-[rgba(255,255,255,.1)] text-white px-4 py-4">
    <div
      @click="playing = !playing"
      class="hover:bg-[rgba(255,255,255,.1)] h-8 px-1.5 flex items-center justify-center rounded"
    >
      <i v-if="playing" class="text-xl icon-park-outline-pause-one"></i>
      <i v-else class="text-xl icon-park-outline-play"></i>
    </div>
    <div>
      {{ currentFormated }}
    </div>
    <div class="w-96">
      <audio ref="audioRef" src="" class="hidden"></audio>
      <a-slider class="block!"></a-slider>
    </div>
    <div>
      {{ durationFormated }}
    </div>
    <div class="dd">
      <a-popover>
        <div class="text-xl hover:bg-[rgba(255,255,255,.1)] h-8 px-1.5 flex items-center justify-center rounded">
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
</template>

<script setup lang="ts">
import numeral from 'numeral';

const playing = ref(true);
const volume = ref(50);
const volumeLast = ref(50);
const current = ref(18);
const duration = ref(120);

const currentFormated = computed(() => numeral(current.value).format('0:00'));
const durationFormated = computed(() => numeral(duration.value).format('0:00'));

const volumeIcon = computed(() => {
  if (volume.value <= 0) {
    return 'icon-park-outline-volume-mute';
  } else if (volume.value <= 50) {
    return 'icon-park-outline-volume-small';
  } else {
    return 'icon-park-outline-volume-notice';
  }
});
</script>

<style scoped></style>
