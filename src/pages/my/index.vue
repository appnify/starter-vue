<template>
  <BreadPage>
    <template #content>
      <section class="my-page m-5 py-4 pr-4 h-full bg-white">
        <a-tabs direction="vertical">
          <a-tab-pane key="1" title="基本设置">
            <template #title>
              <i class="icon-park-outline-config"></i>
              基本设置
            </template>
            <a-form :model="user" layout="vertical">
              <a-form-item label="个人头像">
                <a-avatar :size="64">
                  <img src="https://github.com/juetan.png" alt="" />
                  <template #trigger-icon>
                    <i class="icon-park-outline-edit"></i>
                  </template>
                </a-avatar>
                <template #help> 支持 5MB 以内大小, png 或 jpg 格式的图片 </template>
              </a-form-item>
              <a-form-item label="用户昵称">
                <a-input v-model="user.nickname" placeholder="请输入" class="!w-[432px]" :max-length="24" :show-word-limit="true"></a-input>
                <template #help> 用作系统内显示的名称，可在后台修改 </template>
              </a-form-item>
              <a-form-item label="个人描述">
                <a-textarea v-model="user.description" placeholder="请输入" class="!w-[432px] h-24" :max-length="140" :show-word-limit="true"></a-textarea>
              </a-form-item>
              <a-form-item label="性别">
                <a-radio-group v-model="user.gender" type="button">
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                  <a-radio :value="3">保密</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="出生日期">
                <a-date-picker v-model="user.birth"></a-date-picker>
              </a-form-item>
              <a-button type="primary">保存修改</a-button>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="5" title="消息推送">
            <template #title>
              <i class="icon-park-outline-message"></i>
              消息通知
            </template>
            <a-form :model="user" layout="vertical">
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
          </a-tab-pane>
          <a-tab-pane key="8" title="账号密码">
            <template #title>
              <i class="icon-park-outline-lock"></i>
              账号密码
            </template>
            <a-form :model="user" layout="vertical">
              <a-form-item label="原密码">
                <a-input placeholder="请输入原密码"></a-input>
              </a-form-item>
              <a-form-item label="新密码">
                <a-input placeholder="请输入新密码"></a-input>
              </a-form-item>
              <a-form-item label="确认新密码">
                <a-input placeholder="请再次输入新密码"></a-input>
              </a-form-item>
              <a-button type="primary">修改密码</a-button>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" title="主题偏好">
            <template #title>
              <i class="icon-park-outline-theme"></i>
              主题设置
            </template>
            <div class="flex-1">
              <a-form :model="user" layout="vertical">
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
          </a-tab-pane>
          <a-tab-pane key="3" title="额外功能">
            <template #title>
              <i class="icon-park-outline-shield"></i>
              基本设置
            </template>
            <div class="flex-1 grid">
              <div class="mb-3">功能列表</div>
              <div v-for="i in 3" class="border-t py-4 flex justify-between items-center gap-4">
                <div class="flex gap-3 items-center">
                  <div class="p-2 bg-slate-100 rounded">
                    <svg
                      t="1692015760052"
                      class="icon h-8 w-10"
                      viewBox="0 0 1264 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7353"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M0 333.884235a90.352941 90.352941 0 0 1 90.352941-90.352941h1084.235294a90.352941 90.352941 0 0 1 90.352941 90.352941v271.058824h-256a105.411765 105.411765 0 1 0 0 210.823529H1264.941176v90.352941a90.352941 90.352941 0 0 1-90.352941 90.352942H90.352941a90.352941 90.352941 0 0 1-90.352941-90.352942v-572.235294z m1008.941176 421.647059a45.176471 45.176471 0 1 0 0-90.352941 45.176471 45.176471 0 0 0 0 90.352941z"
                        fill="#C1D0FF"
                        p-id="7354"
                      ></path>
                      <path
                        d="M90.352941 190.343529a60.235294 60.235294 0 0 1 66.861177-59.843764l963.764706 107.068235A60.235294 60.235294 0 0 1 1174.588235 297.441882v187.030589a60.235294 60.235294 0 0 1-60.235294 60.235294H150.588235a60.235294 60.235294 0 0 1-60.235294-60.235294V190.343529zM140.649412 83.275294A90.352941 90.352941 0 0 1 249.615059 13.251765l886.573176 205.914353L139.264 90.051765l1.385412-6.746353z"
                        fill="#0B77FF"
                        p-id="7355"
                      ></path>
                      <path
                        d="M0 331.294118a90.352941 90.352941 0 0 1 90.352941-90.352942h1084.235294a90.352941 90.352941 0 0 1 90.352941 90.352942v271.058823h-256a105.411765 105.411765 0 1 0 0 210.82353H1264.941176v90.352941a90.352941 90.352941 0 0 1-90.352941 90.352941H90.352941a90.352941 90.352941 0 0 1-90.352941-90.352941V331.294118z"
                        fill="#E8E8E8"
                        fill-opacity=".1"
                        p-id="7356"
                      ></path>
                      <path
                        d="M90.352941 271.058824h1084.235294a60.235294 60.235294 0 0 1 60.235294 60.235294v240.941176h-225.882353a135.529412 135.529412 0 1 0 0 271.058824H1234.823529v60.235294a60.235294 60.235294 0 0 1-60.235294 60.235294H90.352941a60.235294 60.235294 0 0 1-60.235294-60.235294V331.294118a60.235294 60.235294 0 0 1 60.235294-60.235294z m1174.588235 60.235294a90.352941 90.352941 0 0 0-90.352941-90.352942H90.352941a90.352941 90.352941 0 0 0-90.352941 90.352942v572.235294a90.352941 90.352941 0 0 0 90.352941 90.352941h1084.235294a90.352941 90.352941 0 0 0 90.352941-90.352941v-90.352941h-256a105.411765 105.411765 0 1 1 0-210.82353H1264.941176v-271.058823z"
                        fill="#FFFFFF"
                        fill-opacity=".6"
                        p-id="7357"
                      ></path>
                      <path
                        d="M353.882353 424.237176H271.058824l82.823529 195.764706h-41.411765v39.152942h82.82353v39.152941h-82.82353v39.152941h82.82353v78.305882h82.823529v-78.305882h82.823529v-39.152941h-82.823529v-39.152941h82.823529v-39.152942H519.529412l82.823529-195.764706h-82.823529l-82.82353 195.764706-82.823529-195.764706z"
                        fill="#FFFFFF"
                        p-id="7358"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-gray-900">支付功能</div>
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
import { reactive } from "vue";

const user = reactive({
  nickname: "绝弹",
  description: "选择在公开个人资料中显示私有项目的贡献，但不显示任何项目，仓库或组织信息",
  theme: "dark",
  email: "810335188@qq.com",
  msg: [2],
  gender: 1,
  birth: "1988-12-18",
});
</script>

<style lang="less">
.my-page {
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
    "icon": "icon-park-outline-config"
  }
}
</route>
