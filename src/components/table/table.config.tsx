import { Button } from "@arco-design/web-vue";
import { IconRefresh, IconSearch } from "@arco-design/web-vue/es/icon";

/**
 * 搜索表单默认参数
 */
export const TABLE_SEARCH_DEFAULTS = {
  labelAlign: "left",
  autoLabelWidth: true,
  model: {},
};

/**
 * 表格列默认参数
 */
export const TABLE_COLUMN_DEFAULTS = {
  ellipsis: true,
  tooltip: true,
  render: ({ record, column }: any) => record[column.dataIndex] || "-",
};

/**
 * 行操作按钮默认参数
 */
export const TABLE_ACTION_DEFAULTS = {
  buttonProps: {
    type: "primary",
  },
};

/**
 * 删除弹窗默认参数
 */
export const TABLE_DELTE_DEFAULTS = {
  title: "删除确认",
  content: "确认删除当前数据吗?",
  modalClass: "text-center",
  hideCancel: false,
  maskClosable: false,
};

export const TALBE_INDEX_DEFAULTS = {
  title: "#",
  width: 60,
  align: "center",
  render: ({ rowIndex }: any) => rowIndex + 1,
};

export const searchItem = {
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
};
