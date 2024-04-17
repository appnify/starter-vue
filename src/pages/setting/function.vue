<template>
  <AnPage>
    <!-- <div>
      <div class="bg-white">
        <div v-for="t1 in types" :key="t1.label" class="flex items-center">
          {{ t1.label }}：
          <div class="flex gap-2">
            <a-tag
              v-for="t2 in t1.children"
              :key="t2.value"
              :checked="search.bk === t2.value"
              color="blue"
              :bordered="true"
              checkable
              @check="search.bk = t2.value"
            >
              {{ t2.label }}
            </a-tag>
          </div>
        </div>
      </div>
    </div> -->
    <div class="grid">
      <div class="mb-3">功能列表</div>
      <div v-for="i in 3" class="border-t py-4 flex justify-between items-center gap-4">
        <div class="flex gap-3 items-center">
          <div class="p-2 bg-slate-100 rounded">
            <i class="i-icon-park-outline-mail"></i>
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
  </AnPage>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FunctionPage',
})

definePage({
  meta: {
    title: '插件设置',
    icon: 'i-icon-park-outline-lightning',
    componentName: 'FunctionPage',
    sort: 30401,
    loading: false,
    auth: 'setting_function_page',
  },
})

const search = reactive({ bk: undefined as string | undefined })
const types = [
  {
    label: '板块',
    children: [
      {
        label: '全部',
        value: undefined,
      },
      {
        label: '电影',
        value: 'fild',
      },
      {
        label: '电视剧',
        value: 'vs',
      },
      {
        label: '综艺',
        value: 'zy',
      },
      {
        label: '动漫',
        value: 'dm',
      },
      {
        label: '短剧',
        value: 'dj',
      },
      {
        label: '体育',
        value: 'ty',
      },
      {
        label: '纪录片',
        value: 'jlp',
      },
      {
        label: '游戏',
        value: 'yx',
      },
      {
        label: '新闻',
        value: 'xw',
      },
      {
        label: '娱乐',
        value: 'yl',
      },
      {
        label: '生活',
        value: 'sh',
      },
      {
        label: '音乐',
        value: 'yinyue',
      },
      {
        label: '时尚',
        value: 'shishang',
      },
      {
        label: '科技',
        value: 'keji',
      },
      {
        label: '发现',
        value: 'faxian',
      },
    ],
  },
]
</script>

<style scoped></style>
