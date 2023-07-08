<template>
  <div class="toast">
    <div class="toast-content">
      <i :class="[icon, iconRotate && 'rotate']"></i>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "toast",
});

const props = defineProps({
  message: {
    type: String,
    default: "正在操作中，请稍等...",
  },
  icon: {
    type: String,
    default: "icon-park-outline-loading-one",
  },
  iconRotate: {
    type: Boolean,
    default: true,
  },
  mask: {
    type: Boolean,
    default: false,
  },
  cover: {
    type: Boolean,
    default: true,
  },
});

const style = computed(() => {
  return {
    pointerEvents: props.cover ? "initial" : "none",
    backgroundColor: props.mask ? "rgba(0, 0, 0, 0.2)" : "transparent",
  };
});
</script>

<style>
.toast {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: v-bind("style.pointerEvents");
  background-color: v-bind("style.backgroundColor");
}
.toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}
.rotate {
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
