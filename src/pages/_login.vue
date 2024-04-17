<template>
  <div class="login-page">
    <header class="login-header">
      <!-- 顶部可以添加导航栏 -->
    </header>
    <main class="login-main">
      <div class="login-box">
        <aside class="login-left">
          <!-- 可以添加标语和介绍等内容 -->
        </aside>
        <section class="login-right">
          <div>
            <h1 class="login-title">{{ $route.meta.title }}</h1>
            <p class="login-subtitle">{{ meridiem }}好，欢迎访问{{ appStore.title }}。</p>
          </div>
          <a-form ref="formRef" :model="model" :rules="formRules" layout="vertical" class="login-form">
            <a-form-item field="username" label="账号" :disabled="loading" hide-asterisk>
              <a-input v-model="model.username" placeholder="例如：admin" allow-clear>
                <template #prefix>
                  <i class="i-icon-park-outline-user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="password" label="密码" :disabled="loading" hide-asterisk>
              <a-input-password v-model="model.password" placeholder="例如：123456" allow-clear>
                <template #prefix>
                  <i class="i-icon-park-outline-lock" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item hide-label>
              <div class="login-submit-wrapper">
                <div class="login-actions">
                  <!-- <a-checkbox checked="rememberPassword" :disabled="loading">记住我</a-checkbox> -->
                  <a-link @click="onForgetPassword">忘记密码?</a-link>
                </div>
                <a-button type="primary" html-type="submit" long :loading="loading" class="login-button" @click="onSubmitForm">
                  {{ loading ? '登陆中' : '立即登录' }}
                </a-button>
                <p class="login-other-way">暂不支持其他方式登录</p>
              </div>
            </a-form-item>
          </a-form>
        </section>
      </div>
    </main>
    <footer class="login-footer">Copyright &copy; {{ appStore.title }}, 版权所有</footer>
  </div>
</template>

<script lang="ts" setup>
import { login } from '@/api/Auth'
import { useAppStore } from '@/store/appStore'
import { useUserStore } from '@/store/userStore'
import { FieldRule, Form, Message } from '@arco-design/web-vue'
import { dayjs } from '@/utils/dayjs'
import { reactive } from 'vue'

defineOptions({
  name: 'LoginPage',
})

definePage({
  meta: {
    title: '用户登录',
    icon: 'i-icon-park-outline-home',
    componentName: 'LoginPage',
    sort: 101,
    auth: 'logout',
  },
})

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const model = reactive({ username: '', password: '' })
const loading = ref(false)
const formRef = ref<InstanceType<typeof Form>>()
const meridiem = dayjs.localeData().meridiem(dayjs().hour(), dayjs().minute())

const formRules: Record<string, FieldRule[]> = {
  username: [
    {
      required: true,
      message: '账号必填',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必填',
    },
  ],
}

const onForgetPassword = () => {
  Message.info({
    content: '重置密码，请联系管理员: xxxx@example.com 。',
    duration: 10000,
    closable: true,
  })
}

const onSubmitForm = async () => {
  if (await formRef.value?.validate()) {
    return
  }
  loading.value = true
  try {
    await login(model)
    userStore.id = 1
    Message.success(`登陆成功`)
    router.push({ path: (route.query.redirect as string) || '/' })
  } catch (error: unknown) {
    // TODO
  }
  loading.value = false
}
</script>

<style lang="less">
.login-page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
  background-image: url(../assets/building.jpg);
  .login-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }
  .login-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    width: 960px;
    height: 560px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  }
  .login-left {
    position: relative;
    width: 100%;
    padding: 0 16px;
    height: 100%;
    overflow: hidden;
    background:
      url(../assets//carton.svg) no-repeat center center/90% auto,
      linear-gradient(15deg, rgb(var(--primary-6)) 25%, rgb(var(--primary-5)) 80%);
  }
  .login-right {
    position: relative;
    padding: 80px 56px;
    background-color: #fff;
  }
  .login-title {
    font-size: 24px;
    color: rgb(var(--primary-6));
    font-weight: 400;
  }
  .login-subtitle {
    color: rgb(var(--gray-6));
    margin-top: 10px;
  }
  .login-header {
    height: 80px;
  }
  .login-footer {
    height: 80px;
    color: rgb(var(--gray-6));
    padding: 32px;
    text-align: center;
  }
  .login-form {
    margin-top: 24px;
  }
  .login-submit-wrapper {
    width: 100%;
  }
  .login-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
    margin-bottom: 8px;
  }
  .login-other-way {
    color: rgb(var(--gray-6));
    text-align: center;
    margin-top: 16px;
  }
  .login-button {
    background: linear-gradient(25deg, rgb(var(--primary-6)) 25%, rgb(var(--primary-4)) 75%);
    box-shadow: 0px 2px 6px 0px rgba(var(--primary-6), 0.28);
  }
}
</style>
@/store/appStore@/store/userStore
