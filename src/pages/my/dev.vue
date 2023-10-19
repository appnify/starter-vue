<template>
  <bread-page>
    <a-input v-model="name" placeholder="中文名称"></a-input>
    <a-button @click="editorRef?.open()">打开</a-button>
    <a-tabs type="capsule" @change="onChange">
      <a-tab-pane v-for="tag in tags" :key="tag.name" :title="tag.description">
        <a-form :model="{}" layout="vertical">
          <a-form-item label="新增接口">
            <a-radio-group type="button" v-model="type.create">
              <a-radio
                v-for="route in routes.filter((i) => i.tag === tag.name)"
                :value="route.operationId"
                :key="route.path"
              >
                {{ route.description }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="修改接口">
            <a-radio-group type="button" v-model="type.modify">
              <a-radio
                v-for="route in routes.filter((i) => i.tag === tag.name)"
                :value="route.operationId"
                :key="route.path"
              >
                {{ route.description }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="查询接口">
            <a-radio-group type="button" v-model="type.select">
              <a-radio
                v-for="route in routes.filter((i) => i.tag === tag.name)"
                :value="route.operationId"
                :key="route.path"
              >
                {{ route.description }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="删除接口">
            <a-radio-group type="button" v-model="type.delete">
              <a-radio
                v-for="route in routes.filter((i) => i.tag === tag.name)"
                :value="route.operationId"
                :key="route.path"
              >
                {{ route.description }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <editor-modal ref="editorRef"></editor-modal>
  </bread-page>
</template>

<script setup lang="ts">
import doc from "@/dd.json";
import editorModal from "./editor.vue";

const editorRef = ref<InstanceType<typeof editorModal>>();
const { tags, routes } = doc;
const type = ref({
  create: undefined,
  select: undefined,
  modify: undefined,
  delete: undefined,
});
const name = ref('')

const onChange = (value: string | number) => {
  console.log(value);
};
</script>

<style lang="less" scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 20010,
    "title": "接口生成",
    "icon": "icon-park-outline-code"
  }
}
</route>
