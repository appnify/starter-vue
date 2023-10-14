<template>
  <bread-page id="list-page">
    <template #default>
      <div class="flex justify-between items-end gap-4">
        <a-button type="primary" @click="visible = true">
          <template #icon>
            <i class="icon-park-outline-add"></i>
          </template>
          添加
        </a-button>
      </div>
      <AList class="mt-2 bg-white" :bordered="true">
        <template #header>
          <div class="flex gap-2 items-center justify-between text-sm bg-[#fbfbfc] px-5 py-2">
            <div class="flex gap-4 my-1.5">
              <ACheckbox> 全选 </ACheckbox>
            </div>
            <div class="flex items-center text-gray-500">
              <ADropdown>
                <a-button type="text">
                  上传者
                  <i class="icon-park-outline-down ml-1"></i>
                </a-button>
                <template #content>
                  <ADoption class="!hover:bg-transparent !px-0 flex">
                    <div class="border-b border-gray-200 w-full pb-1">
                      <AInput placeholder="用户名关键字" />
                    </div>
                  </ADoption>
                  <ADoption v-for="j in 10">
                    <div class="flex items-center gap-1 w-48">
                      <AAvatar :size="20" class="mr-1 bg-slate-50">
                        <img :src="`https://picsum.photo1s/seed/picsum/200/300?${Math.random()}`" alt="" />
                      </AAvatar>
                      绝弹土豆
                    </div>
                  </ADoption>
                </template>
              </ADropdown>
              <ADropdown>
                <a-button type="text">
                  排序：默认
                  <i class="icon-park-outline-down ml-1"></i>
                </a-button>
                <template #content>
                  <ADoption>
                    <template #icon>
                      <i class="icon-park-outline-check"></i>
                    </template>
                    <div class="w-48">默认</div>
                  </ADoption>
                  <ADoption>
                    <template #icon> </template>
                    按创建时间升序
                  </ADoption>
                  <ADoption> 按创建时间降序 </ADoption>
                  <ADoption> 按文件大小升序 </ADoption>
                  <ADoption> 按文件大小降序 </ADoption>
                </template>
              </ADropdown>
              <div class="space-x-1">
                <a-button type="text">
                  <template #icon>
                    <i class="icon-park-outline-list"></i>
                  </template>
                </a-button>
                <a-button type="text">
                  <template #icon>
                    <i class="icon-park-outline-insert-table"></i>
                  </template>
                </a-button>
                <a-button type="text">
                  <template #icon>
                    <i class="icon-park-outline-refresh"></i>
                  </template>
                </a-button>
              </div>
            </div>
          </div>
        </template>
        <AListItem v-for="i in 10">
          <AListItemMeta title="测试图片.png" description="image/png 1.2MB">
            <template #avatar>
              <ACheckbox class="mr-3"></ACheckbox>
              <AImage
                :src="`https://picsum.photos/200/300?${Math.random()}`"
                height="32"
                width="48"
                class="bg-slate-50"
              >
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
            <div class="flex items-center gap-6">
              <span class="text-xs text-gray-400">
                <i class="icon-park-outline-user !w-[14px] !h-[14px]"></i>
                绝弹
              </span>
              <span class="text-xs text-gray-400">2023-08-17 17:00:01</span>
              <ADropdown @select="onRowActionsSelect" position="br">
                <a-button type="text">
                  <template #icon>
                    <i class="icon-park-outline-more"></i>
                  </template>
                </a-button>
                <template #content>
                  <ADoption value="detail">
                    <template #icon>
                      <i class="icon-park-outline-repair"></i>
                    </template>
                    <div>详情</div>
                  </ADoption>
                  <ADoption value="delete" class="!text-red-500 !hover-bg-red-50">
                    <template #icon>
                      <i class="icon-park-outline-delete"></i>
                    </template>
                    删除
                  </ADoption>
                </template>
              </ADropdown>
            </div>
          </template>
        </AListItem>
      </AList>
      <div class="mt-4 flex justify-end">
        <a-pagination :total="232" :show-total="true"></a-pagination>
      </div>
      <a-modal v-model:visible="visible" title="修改密码" :width="432" :footer="false" title-align="start">
        <a-form :model="{}" layout="vertical">
          <a-form-item label="原密码">
            <a-input placeholder="请输入原密码"></a-input>
          </a-form-item>
          <a-form-item label="新密码">
            <a-input placeholder="请输入新密码"></a-input>
          </a-form-item>
          <a-form-item label="确认新密码">
            <a-input placeholder="请再次输入新密码"></a-input>
          </a-form-item>
          <a-button type="primary" class="w-full mt-2">修改密码</a-button>
        </a-form>
      </a-modal>
    </template>
  </bread-page>
</template>

<script setup lang="tsx">
import { Modal } from "@arco-design/web-vue";

const visible = ref(false);

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
.arco-list-medium .arco-list-content-wrapper .arco-list-content > .arco-list-item {
  padding: 4px 20px;
}
button.arco-btn-text,
.arco-btn-text[type="button"],
.arco-btn-text[type="submit"] {
  color: inherit;
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
