import { Divider, Link, TableColumnData } from '@arco-design/web-vue';

interface TableBaseColumn {
  /**
   * 类型
   * @example
   * ```tsx
   * 'delete'
   * ```
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
   * 确认弹窗配置
   * @example
   * ```ts
   * '确定删除吗?'
   * ```
   */
  confirm?: string;
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
  icon?: string;
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
  onClick?: (props: any) => any | Promise<any>;
}

interface TableButtonColumn {
  /**
   * 类型
   */
  type: 'button';
  /**
   * 按钮列表
   * @example
   * ```ts
   * [{
   *   type: 'delete',
   *   text: '删除',
   *   onClick: (args) => api.user.rmUser(args.record.id)
   * }]
   * ```
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
  (TableIndexColumn | TableBaseColumn | TableButtonColumn | TableDropdownColumn) & {
    /**
     * 是否可配置
     * @example
     * ```ts
     * true
     * ```
     */
    configable?: boolean;
  };

export function useTableColumns(data: TableColumn[]) {
  const columns: TableColumnData[] = [];

  for (let column of data) {
    //   if (column.type === "index") {
    //     column = useTableIndexColumn(column);
    //   }

    if (column.type === 'button') {
      column = useTableButtonColumn(column);
    }

    //   if (column.type === "dropdown") {
    //     column = useTableDropdownColumn(column);
    //   }

    columns.push(column);
  }

  return columns;
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
          {index !== 0 && <Divider direction="vertical" margin={2} />}
          <Link {...item.buttonProps} disabled={item.disable?.(props)} onClick={() => item.onClick?.(props)}>
            {{
              default: () => item.text,
              // icon: () => item.icon ? <i class={item.icon}></i> : null
            }}
          </Link>
        </>
      );
    });
  };
  return column;
}

function useTableDropdownColumn() {}
