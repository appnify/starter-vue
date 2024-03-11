<template>
  <AnPage>
    <div class="flex">
      <div class="w-full">
        <div class="flex item-center justify-between gap-4">
          <div>
            <h2 class="m-0 text-lg font-normal flex items-center gap-2">
              邮件设置
              <a-tag :color="mail.enable ? 'green' : 'red'">
                <template #icon>
                  <i class="icon-park-outline-check-one"></i>
                  {{ mail.enable ? '已启用' : '已停用' }}
                </template>
              </a-tag>
            </h2>
            <p class="text-gray-500 mt-1.5 p-0 m0 m-0">首次为你的帐户添加密码时，你需要前往密码重置页面，以便我们验证你的身份。</p>
          </div>
          <div class="flex items-center pr-6">
            
          </div>
        </div>
        <a-form :model="{}" :disabled="!mail.enable" label-align="left" class="col-form divide-y divide-gray-100 mt-8 space-y-6">
          <a-form-item label="是否启用" :disabled="false">
            <a-switch v-model="mail.enable"> </a-switch>
            <template #help> 启用后其他服务可发送邮件通知。 </template>
          </a-form-item>
          <a-form-item label="服务器地址和端口" class="pt-6">
            <a-input v-model="mail.smtpHost" allow-clear placeholder="请输入" class="!w-[314px]"></a-input>
            <span class="inline-block px-2">:</span>
            <a-input-number v-model="mail.smtpPort" :min="0" :max="65535" class="w-24!"></a-input-number>
            <template #help>
              示例: smtp.163.com:25。国内常见有
              <a target="_blank" class="mr-2" href="https://mail.163.com">网易邮箱</a>
              <a target="_blank" class="mr-2" href="http://mail.aliyun.com/">阿里邮箱</a>
              <a target="_blank" class="mr-2" href="https://mail.qq.com">QQ邮箱</a>等。
            </template>
          </a-form-item>
          <a-form-item label="发信人地址" class="pt-6">
            <a-input v-model="mail.smtpFrom" placeholder="请输入" class="!w-[432px]"></a-input>
            <template #help> 示例: example@mail.com。仅作为发送邮件时的发送人标识，与登陆无关。</template>
          </a-form-item>
          <a-form-item label="是否需要验证" class="pt-6">
            <a-switch v-model="mail.smtpAuth"> </a-switch>
            <template #help> 可选 </template>
          </a-form-item>
          <a-form-item label="验证账号" class="pt-6">
            <a-input :disabled="!mail.enable || !mail.smtpAuth" v-model="mail.smtpUser" placeholder="请输入" class="!w-[432px]"></a-input>
            <template #help> 示例: example@mail.com。企业邮箱请使用企业域名后缀。</template>
          </a-form-item>
          <a-form-item label="验证密码" class="pt-6">
            <a-input :disabled="!mail.enable || !mail.smtpAuth" v-model="mail.smtpPass" placeholder="请输入" class="!w-[432px]"></a-input>
            <template #help> 示例：AATOLARFABJKYWUY。具体请在对应邮箱设置面板进行生成。 </template>
          </a-form-item>
          <a-form-item :disabled="false" class="pt-6">
            <a-button type="primary"> 保存修改 </a-button>
            <a-button class="ml-4">
              测试
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- <a-divider direction="vertical" :margin="32"></a-divider>
      <div class="flex-1">
        <div>
          <div class="text-lg font-normal">邮件测试</div>
          <div class="text-gray-400 mt-1">发送一封测试邮件，检测邮件设置是否能正常工作。</div>
          <div class="mt-6">
            <a-input placeholder="接收人邮箱" class="w-[432px]!"></a-input>
          </div>
          <a-textarea placeholder="写点什么..." class="w-[432px]! h-24 mt-2"></a-textarea>
          <div class="mt-2">
            <a-button type="primary" :disabled="!mail.enable">发送邮件</a-button>
          </div>
        </div>
      </div> -->
    </div>
  </AnPage>
</template>

<script setup lang="ts">
const mail = reactive({
  enable: true,
  smtpHost: '10.10.10.30',
  smtpPort: 25,
  smtpFrom: 'no-reply@juetan.cn',
  smtpAuth: true,
  smtpUser: '952222@163.com',
  smtpPass: 'FenZyealdsa@s92.',
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 30401,
    "title": "邮件设置",
    "icon": "icon-park-outline-mail"
  }
}
</route>
