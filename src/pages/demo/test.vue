<template>
  <bread-page id="list-page">
    <template #content>
      <AList class="mx-5 mt-3 bg-white" :bordered="true">
        <template #header>
          <div class="flex gap-2 items-center justify-between text-sm bg-[#fbfbfc] px-5 py-2">
            <div class="flex gap-4">
              <ACheckbox></ACheckbox>
              <AInput class="inline-block w-80" placeholder="输入名称关键字"></AInput>
            </div>
            <div class="flex items-center gap-4">
              <ADropdown>
                <span class="cursor-pointer">
                  上传者
                  <i class="icon-park-outline-down"></i>
                </span>
                <template #content>
                  <ADoption class="!hover:bg-transparent !px-0 flex">
                    <div class="border-b border-gray-200 w-full pb-1">
                      <AInput placeholder="用户名关键字" />
                    </div>
                  </ADoption>
                  <ADoption v-for="j in 10">
                    <div class="flex items-center gap-1 w-48">
                      <AAvatar :size="20" class="mr-1">
                        <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
                      </AAvatar>
                      绝弹土豆
                    </div>
                  </ADoption>
                </template>
              </ADropdown>
              <ADropdown>
                <span class="cursor-pointer">
                  排序：默认
                  <i class="icon-park-outline-down"></i>
                </span>
                <template #content>
                  <ADoption>
                    <div class="w-48">默认</div>
                  </ADoption>
                  <ADoption>
                    <template #icon>
                      <i class="icon-park-outline-sort-amount-up"></i>
                    </template>
                    按创建时间升序
                  </ADoption>
                  <ADoption>
                    <template #icon>
                      <i class="icon-park-outline-sort-amount-down"></i>
                    </template>
                    按创建时间降序
                  </ADoption>
                  <ADoption>
                    <template #icon>
                      <i class="icon-park-outline-align-text-top"></i>
                    </template>
                    按文件大小升序
                  </ADoption>
                  <ADoption>
                    <template #icon>
                      <i class="icon-park-outline-align-text-bottom"></i>
                    </template>
                    按文件大小降序
                  </ADoption>
                </template>
              </ADropdown>
              <div class="space-x-1">
                <span
                  class="inline-flex p-1 hover:bg-slate-100 rounded cursor-pointer text-gray-400 hover:text-gray-700"
                >
                  <i class="icon-park-outline-list"></i>
                </span>
                <span
                  class="inline-flex p-1 hover:bg-slate-100 rounded cursor-pointer text-gray-400 hover:text-gray-700"
                >
                  <i class="icon-park-outline-insert-table"></i>
                </span>
                <span
                  class="inline-flex p-1 hover:bg-slate-100 rounded cursor-pointer text-gray-400 hover:text-gray-700"
                >
                  <i class="icon-park-outline-refresh"></i>
                </span>
              </div>
            </div>
          </div>
        </template>
        <AListItem v-for="i in 10">
          <AListItemMeta title="测试图片.png" description="image/png 1.2MB">
            <template #avatar>
              <ACheckbox class="mr-3"></ACheckbox>
              <AImage src="https://picsum.photos/seed/picsum/200/300" height="40">
                <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
              </AImage>
            </template>
            <template #title>
              <span class="hover:text-blue-500 cursor-pointer">测试图片.png</span>
            </template>
            <template #description>
              <div class="text-xs text-gray-400">image/png 1.2MB</div>
            </template>
          </AListItemMeta>
          <template #actions>
            <span class="text-xs text-gray-400">
              <i class="icon-park-outline-user !w-[14px] !h-[14px]"></i>
              绝弹
            </span>
            <span class="text-xs text-gray-400">2023-08-17 17:00:01</span>
            <ADropdown @select="onRowActionsSelect">
              <span class="inline-flex p-1 hover:bg-slate-100 rounded cursor-pointer">
                <i class="icon-park-outline-more"></i>
              </span>
              <template #content>
                <ADoption value="detail" class="w-32">
                  <template #icon>
                    <i class="icon-park-outline-repair"></i>
                  </template>
                  <div class="w-32">详情</div>
                </ADoption>
                <ADoption value="delete" class="!text-red-500 !hover-bg-red-50">
                  <template #icon>
                    <i class="icon-park-outline-delete"></i>
                  </template>
                  删除
                </ADoption>
              </template>
            </ADropdown>
          </template>
        </AListItem>
      </AList>
    </template>
  </bread-page>
</template>

<script setup lang="tsx">
import { Modal } from "@arco-design/web-vue";

const onRowActionsSelect = () => {
  Modal.open({
    title: "提示",
    titleAlign: "start",
    width: 432,
    content: "确定删除该文件吗？该操作不可恢复。",
    maskClosable: false,
    closable: false,
    okText: "确定删除",
    okButtonProps: {
      status: "danger",
    },
  });
};
</script>

<style lang="less">
#list-page {
  .arco-list-header {
    padding: 0;
  }
}
// .arco-dropdown-list {
//   padding: 0 4px;
//   .arco-dropdown-option {
//     border-radius: 4px;
//   }
// }
.arco-list-medium .arco-list-content-wrapper .arco-list-content > .arco-list-item {
  padding: 4px 20px;
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 10202,
    "title": "表单组件",
    "icon": "icon-park-outline-aperture-priority"
  }
}
</route>
