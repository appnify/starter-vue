import { Button } from "@arco-design/web-vue";
import { IconRefresh, IconSearch } from "@arco-design/web-vue/es/icon";

export const config = {
  searchFormProps: {
    labelAlign: "left",
    autoLabelWidth: true,
    model: {},
  },
  searchItemSubmit: {
    field: "id",
    type: "custom",
    itemProps: {
      class: "table-search-item col-start-4 !mr-0 grid grid-cols-[0_1fr]",
      hideLabel: true,
    },
    component: () => {
      const tableRef = inject<any>("ref:table");
      return (
        <div class="w-full flex gap-x-2 justify-end">
          {(tableRef.search?.items?.length || 0) > 3 && (
            <Button disabled={tableRef?.loading.value} onClick={() => tableRef?.reloadData()}>
              {{ icon: () => <IconRefresh></IconRefresh>, default: () => "重置" }}
            </Button>
          )}
          <Button type="primary" loading={tableRef?.loading.value} onClick={() => tableRef?.loadData()}>
            {{ icon: () => <IconSearch></IconSearch>, default: () => "查询" }}
          </Button>
        </div>
      );
    },
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 300,
    showTotal: true,
  },
  columnBase: {
    ellipsis: true,
    tooltip: true,
    render: ({ record, column }: any) => record[column.dataIndex] || "-",
  },
  columnIndex: {
    title: "序号",
    width: 60,
    align: "center",
    render: ({ rowIndex }: any) => rowIndex + 1,
  },
  columnButtonBase: {
    buttonProps: {
      // type: "text",
      size: "mini",
    },
  },
  columnButtonDelete: {
    title: "删除确认",
    content: "确认删除当前数据吗?",
    modalClass: "text-center",
    hideCancel: false,
    maskClosable: false,
  },
  getApiErrorMessage(error: any): string {
    const message = error?.response?.data?.message || error?.message || "请求失败";
    return message;
  }
};
