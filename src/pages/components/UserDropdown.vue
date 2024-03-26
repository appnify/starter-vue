<template>
  <a-dropdown position="br" class="user-dropdown">
    <button class="inline-flex items-center cursor-pointer rounded bg-transparent hover:bg-gray-200 px-3 py-1">
      <a-avatar :size="24">
        <img :src="userStore.avatar" :alt="userStore.nickname" class="border-2 border-white" />
      </a-avatar>
      <span class="mx-2">
        {{ userStore.nickname }}
        <span class="text-gray-400">(管理员)</span>
      </span>
      <i class="i-icon-park-outline-down"></i>
      <password-modal></password-modal>
    </button>
    <template #content>
      <a-doption class="bg-transparent!">
        <div class="w-[200px] flex items-center gap-4">
          <a-avatar :size="32">
            <img :src="userStore.avatar" :alt="userStore.nickname" />
          </a-avatar>
          <div class="leading-4 text-base my-2">
            <div class="flex items-center gap-2">
              {{ userStore.nickname }}
            </div>
            <div class="text-xs text-gray-400">
              <span class="text-gray-400">{{ userStore.username }}</span>
            </div>
          </div>
        </div>
      </a-doption>
      <a-divider :margin="4" class="border-gray-100!"></a-divider>
      <a-doption @click="">
        <template #icon>
          <i class="i-icon-park-outline-lock"></i>
        </template>
        修改密码
      </a-doption>
      <a-doption @click="router.push('/my')">
        <template #icon>
          <i class="i-icon-park-outline-user"></i>
        </template>
        账号信息
      </a-doption>
      <a-doption @click="router.push('/user')">
        <template #icon>
          <i class="i-icon-park-outline-earth"></i>
        </template>
        系统设置
      </a-doption>
      <a-doption @click="router.push('/user')">
        <template #icon>
          <i class="i-icon-park-outline-info"></i>
        </template>
        关于
      </a-doption>
      <a-divider :margin="4" class="border-gray-100!"></a-divider>
      <a-doption @click="logout" class="text-red-500!">
        <template #icon>
          <i class="i-icon-park-outline-power"></i>
        </template>
        退出
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { delConfirm } from '@/utils/delConfirm';
import { Message } from '@arco-design/web-vue';
import { useFormModal } from 'arconify';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const logout = async () => {
  delConfirm({
    content: '退出后将跳转到登录页面，确定退出吗？',
    okText: '确定退出',
    async onBeforeOk() {
      userStore.clearUser();
      Message.success('已退出登陆');
      router.push({ path: '/login', query: { redirect: route.path } });
    },
  });
};

const PasswordModal = useFormModal({
  trigger: false,
  modalProps: {
    title: '修改密码',
    width: 500,
  },
  items: [
    {
      field: 'password',
      label: '原密码',
      setter: 'input',
      setterProps: {
        placeholder: '请输入原密码',
      },
      required: true,
    },
    {
      field: 'password1',
      label: '新密码',
      setter: 'input',
      setterProps: {
        placeholder: '请输入新密码',
      },
      required: true,
    },
    {
      field: 'password2',
      label: '确认新密码',
      setter: 'input',
      setterProps: {
        placeholder: '请再次输入新密码',
      },
      required: true,
    },
  ],
});
</script>

<style lang="less">
.user-dropdown {
  .arco-dropdown-list-wrapper {
    max-height: initial;
  }
}
</style>
@/store/user/user
