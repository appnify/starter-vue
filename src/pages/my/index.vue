<template>
  <BreadPage>
    <template #content>
      <section class="my-page m-5 bg-white p-4">
        <div>
          <div class="font-semibold text-lg flex items-center">个人设置</div>
          <div class="mt-1 text-sm text-gray-400">此表情符号和消息会显示在您的个人资料和界面中。</div>
        </div>
        <div>
          <div class="md:flex md:gap-4 mt-3 border-t pt-6">
            <div class="md:w-56 text-gray-400">基本信息</div>
            <div class="flex-1 flex">
              <a-form layout="vertical">
                <a-form-item label="个人头像">
                  <a-avatar :size="64">
                    <img src="https://github.com/juetan.png" alt="" />
                    <template #trigger-icon>
                      <i class="icon-park-outline-edit"></i>
                    </template>
                  </a-avatar>
                </a-form-item>
                <a-form-item label="用户昵称">
                  <a-input v-model="user.nickname" placeholder="请输入" class="!w-[432px]"></a-input>
                  <template #help> 用作系统内显示的名称，可在后台修改 </template>
                </a-form-item>
                <a-form-item label="个人描述">
                  <a-textarea v-model="user.description" placeholder="请输入" class="!w-[432px]"></a-textarea>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <div class="md:flex md:gap-4 mt-6 pt-6 border-t">
            <div class="md:w-56 text-gray-400">联系方式</div>
            <div class="flex-1">
              <a-form layout="vertical">
                <a-form-item label="消息推送">
                  <div>
                    <a-checkbox-group direction="vertical" v-model="user.msg">
                      <a-checkbox v-for="i in 3" :value="i">
                        <span class="leading-1">站内消息</span>
                        <div class="text-gray-400 mt-1">当有新的消息时，通过站内信、邮件、短信等方式通知我</div>
                      </a-checkbox>
                    </a-checkbox-group>
                  </div>
                  <template elp> 用作系统内显示的名称，可在后台修改 </template>
                </a-form-item>
                <a-form-item label="邮箱账号">
                  <a-input v-model="user.email" placeholder="请输入" class="!w-[432px]"></a-input>
                  <template #help> 推荐使用主流邮箱, 例如: gmail.com, qq.com, 163.com等后缀 </template>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <div class="md:flex md:gap-4 mt-6 pt-6 border-t">
            <div class="md:w-56 text-gray-400">偏好设置</div>
            <div class="flex-1">
              <a-form layout="vertical">
                <a-form-item label="主题">
                  <div>
                    <a-radio-group v-model="user.theme" direction="vertical">
                      <a-radio value="dark">
                        黑曜深空
                        <div class="text-gray-400 mt-1">浅绿色主题，包含深林、绿叶、河流等内容</div>
                      </a-radio>
                      <a-radio value="light">
                        天空之城
                        <div class="text-gray-400 mt-1">浅绿色主题，包含深林、绿叶、河流等内容</div>
                      </a-radio>
                    </a-radio-group>
                  </div>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <div class="md:flex md:gap-4 mt-6 pt-6 border-t">
            <div class="md:w-56 text-gray-400"></div>
            <div class="flex-1">
              <a-button type="primary">更新设置</a-button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { reactive } from 'vue';

const emailOptions = [
  {
    label: "qq.com",
    value: "qq.com",
  },
  {
    label: "163.com",
    value: "163.com",
  },
];

const user =reactive({
  nickname: "绝弹",
  description: "选择在公开个人资料中显示私有项目的贡献，但不显示任何项目，仓库或组织信息",
  theme: "dark",
  email: "810335188@qq.com",
  msg: [2],

})
</script>

<style lang="less" scoped>
.my-page :deep {
  .arco-form-item.arco-form-item-error,
  .arco-form-item.arco-form-item-has-help {
    margin-bottom: 20px;
  }
  .arco-form-item-message {
    margin-top: 4px;
  }
  .arco-checkbox,
  .arco-radio {
    align-items: start;
    line-height: initial;
    padding-left: 0;
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
  .arco-checkbox-icon-hover,
  .arco-radio-icon-hover {
    margin-top: 4px;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 30401,
    "title": "个人设置",
    "icon": "icon-park-outline-user"
  }
}
</route>
