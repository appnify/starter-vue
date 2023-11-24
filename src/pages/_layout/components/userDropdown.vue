<template>
  <a-dropdown position="br">
    <span class="inline-flex items-center cursor-pointer rounded hover:bg-gray-100 px-2 py-1.5">
      <a-avatar :size="24">
        <img :src="userStore.avatar || 'https://github.com/juetan.png'" :alt="userStore.nickname" />
      </a-avatar>
      <span class="mx-2">
        {{ userStore.nickname }}
      </span>
      <i class="icon-park-outline-down"></i>
      <password-modal></password-modal>
    </span>
    <template #content>
      <a-doption>
        <div class="w-[200px] flex items-center gap-2">
          <a-avatar :size="32">
            <img :src="userStore.avatar || 'https://github.com/juetan.png'" :alt="userStore.nickname" />
          </a-avatar>
          <div class="leading-4 my-2">
            {{ userStore.nickname }}
            <div class="text-xs text-gray-500">@{{ userStore.username }}</div>
          </div>
        </div>
      </a-doption>
      <a-divider :margin="4"></a-divider>
      <a-doption @click="open()">
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
import { useFormModal } from '@/components/AnForm';
import { useUserStore } from '@/store';
import { delConfirm } from '@/utils';
import { Message } from '@arco-design/web-vue';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const logout = async () => {
  await delConfirm({
    content: '退出后将跳转到登录页面，确定退出吗？',
    okText: '确定退出',
  });
  userStore.clearUser();
  Message.success('提示：已退出登陆!');
  router.push({ path: '/login', query: { redirect: route.path } });
};

const { component: PasswordModal, open } = useFormModal({
  title: '修改密码',
  trigger: false,
  width: 452,
  items: [
    {
      field: 'password',
      label: '原密码',
      setter: 'input',
      setterProps: {
        placeholder: '请输入原密码',
      },
    },
    {
      field: 'password1',
      label: '新密码',
      setter: 'input',
      setterProps: {
        placeholder: '请输入新密码',
      },
    },
    {
      field: 'password2',
      label: '确认密码',
      setter: 'input',
      setterProps: {
        placeholder: '请再次输入新密码',
      },
    },
  ],
});
</script>

<style scoped></style>
