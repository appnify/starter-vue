<template>
  <div class="page-login w-full h-full grid grid-rows-[auto_1fr_auto]">
    <div class="top-0 m-0 h-20 w-full px-10 z-10">
      <div class="md:hidden flex items-center justify-between h-13">
        <div class="flex items-center">
          <img src="/favicon.ico" alt="" width="20" height="20" class="mr-1" />
          <h1 class="text-lg m-0">
            {{ appStore.title }}
          </h1>
        </div>
        <div>v0.0.1</div>
      </div>
    </div>
    <div class="flex items-center justify-center w-full overflow-hidden">
      <div
        class="login-box w-[920px] h-[560px] relative mx-8 grid md:grid-cols-2 rounded overflow-hidden border border-blue-100"
      >
        <div class="relative hidden md:block w-full h-full overflow-hidden bg-[#09f] px-4">
          <img src="@/assets/td.svg" :alt="appStore.title" class="w-full h-full select-none" />
        </div>
        <div class="relative p-20 px-8 md:px-14 bg-white shadow-sm">
          <div class="text-2xl">欢迎登陆</div>
          <div class="text-base text-gray-500 mt-2">{{ meridiem }}好，欢迎登陆{{ appStore.title }}!</div>
          <a-form ref="formRef" :model="model" :rules="formRules" layout="vertical" class="mt-8">
            <a-form-item field="username" label="账号" hide-asterisk>
              <a-input v-model="model.username" placeholder="请输入账号/手机号/邮箱" allow-clear>
                <template #prefix>
                  <i class="icon-park-outline-user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="password" label="密码" hide-asterisk>
              <a-input-password v-model="model.password" placeholder="请输入密码" allow-clear>
                <template #prefix>
                  <i class="icon-park-outline-lock" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
              <div class="flex items-center justify-between">
                <a-checkbox checked="rememberPassword">记住我</a-checkbox>
                <a-link @click="onForgetPasswordClick">忘记密码?</a-link>
              </div>
              <a-button type="primary" html-type="submit" long class="mt-2" :loading="loading" @click="onSubmitClick">
                立即登录
              </a-button>
              <p type="text" long class="text-gray-400 text-center m-0">暂不支持其他方式登录</p>
            </a-space>
          </a-form>
        </div>
      </div>
    </div>
    <div class="text-slate-500 py-8 text-center h-20">Copyright &copy; {{ appStore.title }}, 版权所有</div>
  </div>
</template>

<script lang="ts" setup>
import { api } from "@/api";
import { dayjs } from "@/plugins";
import { useAppStore, useUserStore } from "@/store";
import { FieldRule, Form, Modal } from "@arco-design/web-vue";
import { reactive } from "vue";

const meridiem = dayjs.localeData().meridiem(dayjs().hour(), dayjs().minute());
const appStore = useAppStore();
const userStore = useUserStore();
const model = reactive({ username: "admin", password: "admin" });
const router = useRouter();
const loading = ref(false);
const formRef = ref<InstanceType<typeof Form>>();

const formRules: Record<string, FieldRule[]> = {
  username: [
    {
      required: true,
      message: "请输入账号/手机号/邮箱",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
};

const onForgetPasswordClick = () => {
  Modal.info({
    title: "忘记密码?",
    content: "如已忘记密码，请联系管理员进行密码重置!",
    modalClass: "text-center",
    maskClosable: false,
  });
};

const onSubmitClick = async () => {
  const errors = await formRef.value?.validate();
  if (errors) {
    return;
  }
  try {
    loading.value = true;
    const res = await api.auth.login(model);
    userStore.setUser(res.data.data);
    router.push({ path: "/" });
  } catch {
    console.log(1);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.page-login {
  background-image: url(@/assets/bg-login.jpg);
}
.login-box {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 101,
    "title": "登录",
    "icon": "icon-park-outline-home"
  }
}
</route>
