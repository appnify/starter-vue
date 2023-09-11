<template>
  <div>
    <div class="bg-white px-4 pt-2">
      <bread-crumb></bread-crumb>
      <div class="flex justify-between items-end gap-4 bg-white px-1 py-3">
        <div>
          <div class="text-lg font-semibold">新增文章</div>
          <div class="text-gray-400 mt-1.5">新增的文章需审核才能展现</div>
        </div>
        <div>
          <a-button class="mr-2">保存为草稿</a-button>
          <a-button type="primary">保存发布</a-button>
        </div>
      </div>
    </div>
    <div class="flex gap-4 mt-6 px-6">
      <div class="flex-1 bg-white p-4">
        <a-form :model="{}" layout="vertical">
          <a-form-item label="标题">
            <a-input placeholder="请输入标题" :max-length="120" :show-word-limit="true"></a-input>
          </a-form-item>
          <a-form-item label="文章内容">
            <a-textarea placeholder="说点啥" :max-length="1000" :show-word-limit="true"></a-textarea>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-64 bg-white p-4">
        <a-form :model="{}" layout="vertical">
          <a-form-item label="别名">
            <a-input placeholder="请输入"></a-input>
            <template #help>
              用作URL的别名, 只能包含字母、数字、下划线和破折号
            </template>
          </a-form-item>
          <a-form-item label="分类">
            <a-checkbox-group direction="vertical">
              <a-checkbox>开发工具</a-checkbox>
              <a-checkbox>日常记录</a-checkbox>
              <a-checkbox>心得体验</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="封面图">
            <a-upload draggable></a-upload>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx" name="PostPage">
</script>

<style lang="less">
.export-form {
  .arco-form-item-content {
    display: block;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 10300,
    "title": "新增文章",
    "icon": "icon-park-outline-edit"
  }
}
</route>
