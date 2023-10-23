<template>
  <BreadPage>
    <div class="overflow-hidden grid grid-cols-[auto_auto_1fr]">
      <ani-group></ani-group>
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
  </BreadPage>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { Table, useAniFormModal, useTable } from "@/components";
import { dayjs } from "@/libs/dayjs";
import numeral from "numeral";
import AniGroup from './components/group.vue';
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
      // render: ({ record }) => {
      //   return (
      //     <div class="flex items-center">
      //       <i class={`${getIcon(record.mimetype)} text-xl mr-2`}></i>
      //       {record.name}
      //     </div>
      //   );
      // },
      render({ record }) {
        return (
          <div class="flex items-center">
            <div>
              <i class={`${getIcon(record.mimetype)} text-3xl mr-2`}></i>
            </div>
            <div class="flex flex-col overflow-hidden">
              <span>{record.name}</span>
              <span class="text-gray-400 text-xs truncate">
                {numeral(record.size).format("0 b")}
              </span>
            </div>
          </div>
        );
      },
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
