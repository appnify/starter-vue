<template>
  <bread-page>
    <div class="h-full grid grid-cols-[auto_auto_1fr]">
      <div class="w-[300px]">
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
      </div>
      <a-divider direction="vertical"></a-divider>
      <div class="h-full grid grid-rows-[auto_1fr] gap-2">
        <div>
          <a-button type="primary" @click="onOpen">确定</a-button>
        </div>
        <editor-modal class="bg-gray-100" :content="content"></editor-modal>
      </div>
    </div>
  </bread-page>
</template>

<script setup lang="ts">
import doc from "@/dd.json";
import editorModal from "./editor.vue";
import ejs from "ejs";
import template from "./page.ejs?raw";

const content = ref("");
const { tags, routes } = doc;
const type = ref({
  create: undefined,
  select: undefined,
  modify: undefined,
  delete: undefined,
});

const onChange = (value: string | number) => {
  console.log(value);
};

const onOpen = () => {
  const data = {
    tag: '',
    operationId: '',
    create: {},
    select: {},
    modify: {},
    delete: {},
  };
  for (const route of doc.routes) {
    if (route.operationId === type.value.create) {
      data.create = route;
    }
    if (route.operationId === type.value.select) {
      data.select = route;
    }
    if (route.operationId === type.value.modify) {
      data.modify = route;
    }
    if (route.operationId === type.value.delete) {
      data.delete = route;
    }
  }
  console.log(data);
  content.value = ejs.render(template, data);
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
