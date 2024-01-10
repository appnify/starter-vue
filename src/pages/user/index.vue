<template>
  <a-tabs
    size="large"
    class="tabs-page my-page"
    :default-active-key="($route.query.tab as string)"
    @change="onTabChange"
  >
    <a-tab-pane key="common" title="常规设置">
      <div class="m-4 mt-0 py-4 px-5 bg-white rounded-sm">
        <TabCommon></TabCommon>
      </div>
    </a-tab-pane>
    <a-tab-pane key="mail" title="邮件设置">
      <div class="m-4 mt-0 py-4 px-5 bg-white rounded-sm">
        <TabMail></TabMail>
      </div>
    </a-tab-pane>
    <a-tab-pane key="extra" title="额外功能">
      <div class="m-4 mt-0 py-4 px-5 bg-white rounded-sm flex-1 grid px-6">
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
</template>

<script setup lang="tsx">
import TabCommon from './TabCommon.vue';
import TabMail from './TabMail.vue';

const route = useRoute();
const router = useRouter();
const onTabChange = (val: string | number) => {
  router.replace({ query: { tab: val } });
};
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
