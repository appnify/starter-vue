<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <div class="flex gap-2 items-center">
      <div>
        <img src="@/assets/403.svg" alt="forbiden" class="w-[320px]" />
      </div>
      <div>
        <h2 class="text-3xl m-0 font-medium">403</h2>
        <p class="mt-3">权限不足，如需访问请联系管理员!</p>
        <div class="space-x-3 mt-6">
          <a-button type="primary" @click="router.back()">
            <template #icon>
              <i class="i-icon-park-outline-back"></i>
            </template>
            返回
          </a-button>
          <a-button type="outline" @click="router.push('/')">
            <template #icon>
              <i class="i-icon-park-outline-home"></i>
            </template>
            首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>