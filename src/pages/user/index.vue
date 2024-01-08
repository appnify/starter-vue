<template>
  <BreadPage :content-padding="false">
    <template #content>
      <section class="my-page m-4 bg-white rounded px-4">
        <a-tabs size="large" class="h-full">
          <a-tab-pane key="8" title="常规设置">
            <a-form
              :model="user"
              :label-col-props="{ span: 3 }"
              label-align="left"
              layout="vertical"
              class="px-6 divide-y divide-gray-100"
            >
              <a-form-item label="站点LOGO">
                <a-avatar :size="64">
                  <img :src="appStore.logo" alt="" />
                  <template #trigger-icon>
                    <i class="icon-park-outline-edit"></i>
                  </template>
                </a-avatar>
                <template #help>提示：仅支持 5MB 以内大小, png 或 jpg 格式的图片 </template>
              </a-form-item>
              <a-form-item label="站点名称">
                <a-input
                  v-model="appStore.title"
                  placeholder="请输入"
                  class="!w-[432px]"
                  allow-clear
                  :max-length="24"
                  :show-word-limit="true"
                ></a-input>
                <template #help> 用作系统内显示的名称，可在后台修改 </template>
              </a-form-item>
              <a-form-item label="站点描述">
                <a-textarea
                  v-model="appStore.subtitle"
                  placeholder="请输入"
                  class="!w-[432px] h-24"
                  :max-length="140"
                  :show-word-limit="true"
                ></a-textarea>
                <template #help>
                  启用后，消息通知将在左上角进行提示.
                </template>
              </a-form-item>
              <a-form-item label="站点URL">
                <a-input
                  v-model="appStore.title"
                  placeholder="请输入"
                  class="!w-[432px]"
                  allow-clear
                ></a-input>
                <template #help> 示例：https://www.juetan.cn。用于静态资源前缀、应用接口前缀等用途。 </template>
              </a-form-item>
              <a-form-item>
                <a-button type="primary">保存修改</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="5" title="邮件设置">
            <!-- <div class="mb-6 px-6">
              <div class="text-base font-semibold">邮件来源</div>
              <label class="text-sm block mt-2">
                目前仅支持 SMTP 协议，用于发送验证码、重置密码和消息通知等用途。
              </label>
            </div> -->
            <a-form
              :model="user"
              :label-col-props="{ span: 3 }"
              :disabled="!mail.enable"
              layout="vertical"
              label-align="left"
              class="px-6 divide-y divide-gray-100"
            >
              <a-form-item label="是否启用" :disabled="false">
                <a-radio-group v-model="mail.enable" :type="'button'">
                  <a-radio :value="true">启用</a-radio>
                  <a-radio :value="false">禁用</a-radio>
                </a-radio-group>
                <template #help> 启用后，对应时间触发后将会自动向用户发送邮件通知 </template>
              </a-form-item>
              <a-form-item label="服务器和端口">
                <a-input v-model="mail.smtpHost" allow-clear placeholder="请输入" class="!w-[314px]"></a-input>
                <span class="inline-block px-2">:</span>
                <a-input-number v-model="mail.smtpPort" :min="0" :max="65535" class="w-24!"></a-input-number>
                <template #help> 示例: smtp.163.com:25。国内常见有
                  <a target="_blank" class="mr-2" href="https://mail.163.com">网易邮箱</a>
                  <a target="_blank" class="mr-2" href="http://mail.aliyun.com/">阿里邮箱</a>
                  <a target="_blank" class="mr-2" href="https://mail.qq.com">QQ邮箱</a>等，默认 25 端口。
                </template>
              </a-form-item>
              <a-form-item label="发信人地址">
                <a-input v-model="mail.smtpFrom" placeholder="请输入" class="!w-[432px]"></a-input>
                <template #help> 示例: example@mail.com。仅作为发送邮件时的发送人标识，与登陆无关。</template>
              </a-form-item>
              <a-form-item label="是否需要验证">
                <a-radio-group v-model="mail.smtpAuth" :type="'button'">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
                <template #help> 可选 </template>
              </a-form-item>
              <a-form-item label="验证账号">
                <a-input
                  :disabled="!mail.enable || !mail.smtpAuth"
                  v-model="mail.smtpUser"
                  placeholder="请输入"
                  class="!w-[432px]"
                ></a-input>
                <template #help> 示例: example@mail.com。企业邮箱请使用企业域名后缀。</template>
              </a-form-item>
              <a-form-item label="验证密码">
                <a-input
                  :disabled="!mail.enable || !mail.smtpAuth"
                  v-model="mail.smtpPass"
                  placeholder="请输入"
                  class="!w-[432px]"
                ></a-input>
                <template #help> 示例：AATOLARFABJKYWUY。具体请在对应邮箱设置面板进行生成。 </template>
              </a-form-item>
              <!-- <a-form-item label="发送测试邮件">
                <div>
                  <a-textarea placeholder="写点什么..." class="w-[432px]!"></a-textarea>
                  <div class="mt-1">
                    <a-link :disabled="!mail.enable">发送</a-link>
                  </div>
                </div>
                <template #help> 测试邮箱配置是否正确。 </template>
              </a-form-item> -->
              <a-form-item :disabled="false">
                <a-button type="primary"> 保存修改 </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="3" title="额外功能">
            <div class="flex-1 grid px-6">
              <div class="mb-3">功能列表</div>
              <div v-for="i in 3" class="border-t py-4 flex justify-between items-center gap-4">
                <div class="flex gap-3 items-center">
                  <div class="p-2 bg-slate-100 rounded">
                    <i class="icon-park-outline-mail"></i>
                  </div>
                  <div>
                    <div class="text-gray-900 text-base">支付功能</div>
                    <div class="text-gray-400 mt-2">通知管理员由企业互联的管理员来设置，拥有通知业务的最大权限。</div>
                  </div>
                </div>
                <div>
                  <a-switch checked-color="#3c9">
                    <template #checked> 已启用 </template>
                    <template #unchecked> 未启用 </template>
                  </a-switch>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </section>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { useAppStore } from '@/store';
import { reactive } from 'vue';

const appStore = useAppStore();

const mail = reactive({
  enable: true,
  smtpHost: '10.10.10.30',
  smtpPort: 25,
  smtpFrom: 'no-reply@juetan.cn',
  smtpAuth: true,
  smtpUser: '952222@163.com',
  smtpPass: 'FenZyealdsa@s92.',
});

const user = reactive({
  nickname: '绝弹',
  description: '选择在公开个人资料中显示私有项目的贡献，但不显示任何项目，仓库或组织信息',
  theme: 'dark',
  email: '810335188@qq.com',
  msg: [2],
  gender: 1,
  birth: '1988-12-18',
  smtpPort: 25,
  smtpIp: '10.10.10.30',
  smtpUser: '952222@163.com',
  smtpPass: 'xxxxx',
});
</script>

<style lang="less">
.my-page {
  .arco-form-item-wrapper-col {
    display: grid;
    grid-template-columns: min(432px) 1fr;
    gap: 32px;
  }
  .arco-tabs-nav-type-line .arco-tabs-tab {
    height: 52px;
  }
  .arco-form-item.arco-form-item-error,
  .arco-form-item.arco-form-item-has-help {
    margin-bottom: 20px;
  }
  .arco-form-item-message {
    margin-top: 4px;
  }
  .arco-checkbox-icon-hover,
  .arco-radio-icon-hover {
    margin-top: 4px;
  }
  .arco-form-item:not(:first-child) {
    padding: 20px 0 0;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 30401,
    "title": "个人设置",
    "icon": "icon-park-outline-config"
  }
}
</route>
