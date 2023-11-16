import { Divider, Link, TableColumnData } from '@arco-design/web-vue';

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
  type: 'index';
}

interface TableColumnButton {
  /**
   * 特殊类型
   * @example
   * ```ts
   * 'delete'
   * ```
   */
  type?: 'modify' | 'delete';
  /**
   * 按钮文本
   * @example
   * ```ts
   * '修改'
   * ```
   */
  text?: string;
  /**
   * 按钮参数
   * @see ALink
   */
  buttonProps?: Recordable;
  /**
   * 是否可见
   * @example
   * ```ts
   * (props) => props.record.status === 1
   * ```
   */
  visible?: (args: Recordable) => boolean;
  /**
   * 是否禁用
   * @example
   * ```ts
   * (props) => props.record.status === 1
   * ```
   */
  disable?: (args: Recordable) => boolean;
  /**
   * 处理函数
   * @example
   * ```ts
   * (props) => api.user.rmUser(props.record.id)
   * ```
   */
  onClick?: (props: any) => void;
}

interface TableButtonColumn {
  /**
   * 类型
   */
  type: 'button';
  /**
   * 按钮列表
   */
  buttons: TableColumnButton[];
}

interface TableDropdownColumn {
  /**
   * 类型
   */
  type: 'dropdown';
  /**
   * 下拉列表
   */
  dropdowns: any[];
}

export type TableColumn = TableColumnData &
  (TableIndexColumn | TableBaseColumn | TableButtonColumn | TableDropdownColumn);

export function useTableColumns(data: TableColumn[]) {
  const columns = ref<TableColumnData[]>([]);

  // for (let column of data) {
  //   if (column.type === "index") {
  //     column = useTableIndexColumn(column);
  //   }

  for (let column of data) {
    if (column.type === 'button') {
      column = useTableButtonColumn(column);
    }
    columns.value.push(column);
  }

  //   if (column.type === "dropdown") {
  //     column = useTableDropdownColumn(column);
  //   }

  //   columns.push({ ...config.columnBase, ...column });
  // }

  return {
    columns,
  };
}

function useTableIndexColumn() {}

function useTableButtonColumn(column: TableButtonColumn & TableColumnData) {
  const { type, buttons } = column;
  const items: TableColumnButton[] = [];
  for (const button of buttons) {
    items.push(button);
  }
  column.render = props => {
    return items.map((item, index) => {
      if (item.visible && !item.visible(props)) {
        return null;
      }
      return (
        <>
          {index !== 0 && <Divider direction="vertical" margin={4} />}
          <Link {...item.buttonProps} disabled={item.disable?.(props)} onClick={() => item.onClick?.(props)}>
            {item.text}
          </Link>
        </>
      );
    });
  };
  return column;
}

function useTableDropdownColumn() {}
