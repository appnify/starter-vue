<template>
  <a-dropdown position="br">
    <span class="inline-flex items-center cursor-pointer rounded hover:bg-gray-100 px-2 py-1.5">
      <a-avatar :size="20">
        <img :src="userStore.avatar || 'https://github.com/juetan.png'" :alt="userStore.nickname" />
      </a-avatar>
      <span class="mx-2">
        {{ userStore.nickname }}
      </span>
      <i class="icon-park-outline-down"></i>
    </span>
    <template #content>
      <a-doption>
        <div class="w-[160px] leading-4 my-1">
          {{ userStore.nickname }}
          <div class="text-xs text-gray-500">@{{ userStore.username }}</div>
        </div>
      </a-doption>
      <a-divider :margin="4"></a-divider>
      <a-doption>
        <template #icon>
          <i class="icon-park-outline-lock"></i>
        </template>
        修改密码
      </a-doption>
      <a-doption @click="router.push('/my')">
        <template #icon>
          <i class="icon-park-outline-config"></i>
        </template>
        个人设置
      </a-doption>
      <a-divider :margin="4"></a-divider>
      <a-doption @click="logout">
        <template #icon>
          <i class="icon-park-outline-logout"></i>
        </template>
        退出
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const logout = async () => {
  userStore.clearUser();
  Message.success("提示：已退出登陆!");
  router.push({ path: "/login", query: { redirect: route.path } });
};
</script>

<style scoped></style>
