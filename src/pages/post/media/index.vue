<template>
  <BreadPage>
    <template #content>
      <div class="overflow-hidden grid grid-cols-[auto_auto_1fr] m-4 p-4 bg-white">
        <div class="w-[210px] h-full overflow-hidden grid grid-rows-[auto_1fr]">
          <div class="flex gap-2 pr-2">
            <a-input-search allow-clear placeholder="分组名称..." class="mb-2"></a-input-search>
            <a-button>
              <template #icon>
                <i class="icon-park-outline-add"></i>
              </template>
            </a-button>
          </div>
          <a-scrollbar outer-class="h-full overflow-hidden" class="h-full overflow-auto">
            <ul class="pr-4 pl-0 mt-0">
              <li
                v-for="i in 50"
                class="group flex items-center justify-between gap-2 h-8 rounded mb-2 pl-3 hover:bg-gray-100 cursor-pointer"
              >
                <div>
                  <i class="icon-file-folder text-gray-600"></i>
                  日常素材
                  <span class="text-xs text-gray-400">(10)</span>
                </div>
                <div>
                  <a-dropdown>
                    <a-button size="small" type="text">
                      <template #icon>
                        <i class="icon-park-outline-more-one text-gray-400 hover:text-gray-700"></i>
                      </template>
                    </a-button>
                    <template #content>
                      <a-doption @click="typeCtx.open()">
                        <template #icon>
                          <i class="icon-park-outline-edit"></i>
                        </template>
                        修改
                      </a-doption>
                      <a-doption class="!text-red-500">
                        <template #icon>
                          <i class="icon-park-outline-delete"></i>
                        </template>
                        删除
                      </a-doption>
                    </template>
                  </a-dropdown>
                  <type-modal></type-modal>
                </div>
              </li>
            </ul>
          </a-scrollbar>
        </div>
        <a-divider direction="vertical" :margin="16"></a-divider>
        <div>
          <Table v-bind="table">
            <template #action>
              <a-button type="primary" @click="uploadRef?.open()">
                <template #icon>
                  <i class="icon-park-outline-upload"></i>
                </template>
                上传
              </a-button>
              <ani-upload ref="uploadRef"></ani-upload>
            </template>
          </Table>
        </div>
      </div>
    </template>
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useAniFormModal, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";
import numeral from "numeral";
import AniUpload from "./components/upload.vue";

const [typeModal, typeCtx] = useAniFormModal({
  title: "修改分组",
  trigger: false,
  modalProps: {
    width: 432,
  },
  items: [
    {
      field: "name",
      label: "分组名称",
      type: "input",
    },
  ],
  submit: async () => {},
});

const uploadRef = ref<InstanceType<typeof AniUpload>>();

const getIcon = (mimetype: string) => {
  if (mimetype.startsWith("image")) {
    return "icon-file-iimage";
  }
  if (mimetype.startsWith("video")) {
    return "icon-file-ivideo";
  }
  if (mimetype.startsWith("text")) {
    return "icon-file-itxt";
  }
  if (mimetype.startsWith("audio")) {
    return "icon-file-iaudio";
  }
  return "icon-file-iunknown";
};

const table = useTable({
  data: async (model, paging) => {
    return api.upload.getUploads();
  },
  columns: [
    {
      title: "文件名称",
      dataIndex: "name",
      render: ({ record }) => {
        return (
          <div class="flex items-center">
            <i class={`${getIcon(record.mimetype)} text-xl mr-2`}></i>
            {record.name}
          </div>
        );
      },
    },
    {
      title: "大小",
      dataIndex: "description",
      width: 120,
      render: ({ record }) => numeral(record.size).format("0 b"),
    },
    {
      title: "上传时间",
      dataIndex: "createdAt",
      width: 200,
      render: ({ record }) => dayjs(record.createdAt).format(),
    },
    {
      type: "button",
      title: "操作",
      width: 120,
      buttons: [
        {
          type: "modify",
          text: "修改",
        },
        {
          type: "delete",
          text: "删除",
          onClick({ record }) {
            return api.upload.delFile(record.id);
          },
        },
      ],
    },
  ],
  search: {
    button: false,
    items: [
      {
        field: "name",
        label: "文件名称",
        type: "search",
        enableLoad: true,
        itemProps: {
          hideLabel: true,
        },
        nodeProps: {
          placeholder: "素材名称",
        },
      },
    ],
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10304,
    "title": "素材管理",
    "icon": "icon-park-outline-movie-board"
  }
}
</route>
