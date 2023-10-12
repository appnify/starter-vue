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
        class="login-box w-[960px] h-[560px] relative mx-4 grid md:grid-cols-2 rounded overflow-hidden border border-blue-100"
      >
        <div
          class="login-left relative hidden md:block w-full h-full overflow-hidden bg-[rgb(var(--primary-6))] px-4"
        ></div>
        <div class="relative p-20 px-8 md:px-14 bg-white shadow-sm">
          <div class="text-2xl">欢迎登陆</div>
          <div class="text-base text-gray-500 mt-2">{{ meridiem }}好，欢迎登陆{{ appStore.title }}!</div>
          <a-form ref="formRef" :model="model" :rules="formRules" layout="vertical" class="mt-8">
            <a-form-item field="username" label="账号" :disabled="loading" hide-asterisk>
              <a-input v-model="model.username" placeholder="请输入账号/手机号/邮箱" allow-clear>
                <template #prefix>
                  <i class="icon-park-outline-user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="password" label="密码" :disabled="loading" hide-asterisk>
              <a-input-password v-model="model.password" placeholder="请输入密码" allow-clear>
                <template #prefix>
                  <i class="icon-park-outline-lock" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
              <div class="flex items-center justify-between">
                <a-checkbox checked="rememberPassword" :disabled="loading">记住我</a-checkbox>
                <a-link @click="onForgetPassword">忘记密码?</a-link>
              </div>
              <a-button type="primary" html-type="submit" long class="mt-2" :loading="loading" @click="onSubmitForm">
                {{ loading ? '登陆中' : '立即登录' }}
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
import { dayjs } from "@/libs";
import { useAppStore, useUserStore } from "@/store";
import { FieldRule, Form, Message, Modal } from "@arco-design/web-vue";
import { reactive } from "vue";

const meridiem = dayjs.localeData().meridiem(dayjs().hour(), dayjs().minute());
const appStore = useAppStore();
const userStore = useUserStore();
const model = reactive({ username: "juetan", password: "juetan" });
const route = useRoute();
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

const onForgetPassword = () => {
  Modal.info({
    title: "忘记密码?",
    content: "如已忘记密码，请联系管理员进行密码重置!",
    modalClass: "text-center",
    maskClosable: false,
  });
};

const onSubmitForm = async () => {
  if (await formRef.value?.validate()) {
    return;
  }
  try {
    loading.value = true;
    const res = await api.auth.login(model);
    userStore.setUser(res.data.data);
    Message.success(`欢迎回来，${res.data.data.nickname}!`);
    router.push({ path: (route.query.redirect as string) || "/" });
  } catch (error: any) {
    const message = error?.response?.data?.message;
    message && Message.warning(`提示：${message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.page-login {
  background-image: url(./image-bg.jpg);
}
.login-box {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
}
.login-left {
  background: rgb(var(--primary-6)) url(/src/pages/_login/image-br.svg) no-repeat center center/90% auto;
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
