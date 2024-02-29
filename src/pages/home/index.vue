<template>
  <div class="w-full p-5 flex gap-4">
    <div class="flex-1">
      <div class="bg-white p-4">
        <UserTable></UserTable>
      </div>
      <div class="bg-white px-5 py-4 rounded-sm">
        <div>统计概览</div>
        <div class="flex justify-between gap-4 mt-4">
          <div v-for="item in stat" :key="item.title" class="flex-1 items-center flex gap-4 bg-gray-100 py-3 px-4">
            <!-- <div class="text-xl text-gray-500">
              <i :class="item.icon"></i>
            </div> -->
            <div>
              <div class="text-gray-500">
                {{ item.title }}
              </div>
              <div class="text-lg mt-1.5">
                {{ item.count }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white px-5 py-4 rounded-sm mt-4">
        <div>常用服务</div>
        <div class="grid grid-cols-5 justify-between gap-4 mt-4">
          <div v-for="item in stat" :key="item.title" class="group flex-1 flex justify-between bg-gray-100 py-3 px-3">
            <div class="text-gray-500">
              {{ item.title }}
            </div>
            <div class="hidden group-hover:block hover:bg-gray-50 cursor-pointer text-gray-400">
              <i class="icon-park-outline-delete text-xs"></i>
            </div>
          </div>
          <div class="py-3 px-3 border border-dashed rounded-sm border-gray-400 text-gray-500 hover:bg-gray-100 cursor-pointer">
            <i class="icon-park-outline-add ml-2"></i>
            添加服务1
          </div>
        </div>
      </div>
    </div>
    <div class="w-96">
      <div class="bg-white py-4 px-5 rounded">
        <div class="flex gap-4">
          <a-avatar :src="'https://github.com/juetan.png'"></a-avatar>
          <div>
            <div class="mt-1">欢迎，{{ userStore.nickname }}</div>
            <div class="text-gray-400 mt-1.5">管理员</div>
          </div>
        </div>
      </div>
      <div class="bg-white py-4 px-5 mt-4">
        <div class="flex items-center justify-between">
          <span>公告</span>
          <a-link>更多</a-link>
        </div>
        <div class="flex justify-between gap-4 mt-4">
          <ul class="list-none w-full m-0 p-0">
            <li v-for="i in 8" class="w-full h-6 items-center overflow-hidden justify-between flex gap-2 mb-2">
              <a-tag>{{ i }}</a-tag>
              <span class="flex-1 truncate hover:underline underline-offset-2 hover:text-brand-500 cursor-pointer"> 但是预测已加载的数据不足以 </span>
              <span class="text-gray-400">3天前</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useUserStore } from '@/store/user';
import { useTable } from '@/components/AnTable.1';

const UserTable = useTable(instance => {
  return {
    data: async params => {
      await new Promise(res => setTimeout(res, 2000));
      return {
        data: Array.from({ length: params.size }, (_, i) => ({
          id: i + 1,
          name: Math.random(),
        })),
        total: 200,
      };
    },
    columns: [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '操作',
        type: 'button',
        width: 200,
        align: 'right',
        buttons: [
          {
            text: '测试',
            onClick() {
              console.log(instance);
              instance.value?.refresh();
            },
          },
          {
            type: 'delete',
            text: '删除',
            onClick(props) {
              instance.value?.renderData.splice(props.rowIndex, 1);
            },
          },
        ],
      },
    ],
    search: [
      {
        field: 'name',
        label: '请输入名字',
        setter: 'search',
      },
    ],
    actions: [
      {
        text: '测试',
        icon: 'icon-park-outline-refresh',
        disable: () => Boolean(instance.value?.search?.model?.name),
      },
    ],
    widgets: [
      {
        // text: '测试',
        icon: 'icon-park-outline-refresh',
      },
    ],
    tableProps: {
      rowSelection: {
        showCheckedAll: true,
      },
      onSelect(rowKeys, rowKey, record) {
        console.log(rowKeys, rowKey, record);
      },
    },
    tableSlots: {
      // 'pagination-left': () => {
      //   return <a-button>测试1</a-button>;
      // },
      // 'pagination-right': () => {
      //   return <a-button>测试1</a-button>;
      // },
    },
    create: {
      items: [
        {
          field: 'name',
          label: '名字',
          setter: 'input',
        },
      ],
      submit: () => {},
    },
    modify: {
      extend: true,
      title: '修改',
    },
  };
});

const userStore = useUserStore();

const stat = {
  post: {
    title: '文章',
    count: 22,
    icon: 'icon-park-outline-folder-close',
  },
  material: {
    title: '素材',
    count: 119,
    icon: 'icon-park-outline-folder-close',
  },
  comment: {
    title: '评论',
    count: 1802,
    icon: 'icon-park-outline-user',
  },
  user: {
    title: '用户',
    count: 98,
    icon: 'icon-park-outline-user',
  },
  category: {
    title: '分类',
    count: 26,
    icon: 'icon-park-outline-tag',
  },
};
</script>

<style scoped></style>

<route lang="json">
{
  "alias": "/",
  "meta": {
    "sort": 1000,
    "title": "概览",
    "icon": "icon-park-outline-home"
  }
}
</route>
