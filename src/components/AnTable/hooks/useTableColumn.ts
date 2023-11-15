import { TableColumnData } from "@arco-design/web-vue";

interface TableBaseColumn {
  /**
   * 类型
   */
  type?: undefined;
}

interface TableIndexColumn {
  /**
   * 类型
   */
  type: "index";
}

interface TableButtonColumn {
  /**
   * 类型
   */
  type: "button";
  /**
   * 按钮列表
   */
  buttons: any[];
}

interface TableDropdownColumn {
  /**
   * 类型
   */
  type: "dropdown";
  /**
   * 下拉列表
   */
  dropdowns: any[];
}

export type TableColumn = TableColumnData &
  (TableIndexColumn | TableBaseColumn | TableButtonColumn | TableDropdownColumn);

export function useTableColumns(data: TableColumn[]) {
  const columns = ref<any>([]);

  // for (let column of data) {
  //   if (column.type === "index") {
  //     column = useTableIndexColumn(column);
  //   }

  //   if (column.type === "button") {
  //     column = useTableButtonColumn(column);
  //   }

  //   if (column.type === "dropdown") {
  //     column = useTableDropdownColumn(column);
  //   }

  //   columns.push({ ...config.columnBase, ...column });
  // }

  return {
    columns,
  };
}

useTableColumns([
  {
    type: "button",
    buttons: [{}],
  },
  {
    title: "11",
  },
]);

function useTableIndexColumn() {}

function useTableButtonColumn() {}

function useTableDropdownColumn() {}
