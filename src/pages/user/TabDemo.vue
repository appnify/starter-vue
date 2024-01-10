<template>
  <div>
    <!-- <div class="bg-white ">
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
            </div> -->
  </div>
</template>

<script setup lang="ts">
const search = reactive({ bk: undefined });
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
];
</script>

<style scoped></style>
