import { delConfirm } from "@/utils";
import { Divider, Doption, Dropdown, Link, Message, TableColumnData } from "@arco-design/web-vue";
import { isArray, merge } from "lodash-es";
import { Component, Ref, reactive } from "vue";
import { useFormModal } from "../form";
import { Table, TableInstance, TableProps } from "./table";
import { config } from "./table.config";
import { UseTableOptions } from "./use-interface";

const onClick = async (item: any, columnData: any, getTable: any) => {
  if (item.type === "modify") {
    const data = (await item.onClick?.(columnData)) ?? columnData.record;
    getTable()?.openModifyModal(data);
    return;
  }
  if (item.type === "delete") {
    await delConfirm();
    try {
      const resData: any = await item?.onClick?.(columnData);
      const message = resData?.data?.message;
      message && Message.success(`提示：${message}`);
      getTable()?.loadData();
    } catch (error: any) {
      const message = error.response?.data?.message;
      message && Message.warning(`提示：${message}`);
    }
    return;
  }
  item.onClick?.(columnData);
};

/**
 * 表格组件hook
 * @see `src/components/table/use-table.tsx`
 */
export const useTable = (optionsOrFn: UseTableOptions | (() => UseTableOptions)): any => {
  const options: UseTableOptions = typeof optionsOrFn === "function" ? optionsOrFn() : optionsOrFn;
  const columns: TableColumnData[] = [];
  const getTable = (): TableInstance => (columns as any).instance;

  /**
   * 表格列处理
   */
  for (let column of options.columns) {
    /**
     * 索引列处理
     */
    if (column.type === "index") {
      column = merge({}, config.columnIndex, column);
    }

    /**
     * 按钮列处理
     */
    if (column.type === "button" && isArray(column.buttons)) {
      const buttons = column.buttons;
      let hasModify = false;
      let hasDelete = false;
      for (let i = 0; i < buttons.length; i++) {
        let btn = merge({}, config.columnButtonBase);
        if (buttons[i].type === "modify") {
          btn = merge(btn, buttons[i]);
          hasModify = true;
        }
        if (buttons[i].type === "delete") {
          btn = merge(btn, buttons[i]);
          hasDelete = true;
        }
        buttons[i] = merge(btn, buttons[i]);
      }
      if (!hasModify) {
        buttons.push(merge({}, config.columnButtonBase));
      }
      if (!hasDelete) {
        buttons.push(merge({}, config.columnButtonBase));
      }
      column.render = (columnData) => {
        return column.buttons?.map((btn, index) => {
          if (btn.visible?.(columnData) === false) {
            return null;
          }
          return (
            <>
              {index !== 0 ? <Divider direction="vertical" margin={2} class="!border-gray-300"></Divider> : null}
              <Link
                {...btn.buttonProps}
                onClick={() => onClick(btn, columnData, getTable)}
                disabled={btn.disabled?.(columnData)}
              >
                {btn.text}
              </Link>
            </>
          );
        });
      };
    }

    /**
     * 菜单列处理
     */
    if (column.type === "dropdown" && Array.isArray(column.dropdowns)) {
      if (options.modify) {
        const index = column.dropdowns?.findIndex((i) => i.type === "modify");
        if (index !== undefined) {
          column.dropdowns[index] = merge({}, config.columnDropdownModify, column.dropdowns[index]);
        } else {
          column.dropdowns?.unshift(merge({}, config.columnDropdownModify));
        }
      }
      column.render = (columnData) => {
        const content = column.dropdowns?.map((dropdown) => {
          const { text, icon, disabled, visibled, doptionProps } = dropdown;
          if (visibled?.(columnData) === false) {
            return null;
          }
          return (
            <Doption
              {...doptionProps}
              onClick={() => onClick(dropdown, columnData, getTable)}
              disabled={disabled?.(columnData)}
            >
              {{
                icon: typeof icon === "function" ? icon() : () => <i class={icon} />,
                default: text,
              }}
            </Doption>
          );
        });
        const trigger = () => (
          <span class="px-2 py-[1px] h-6 vertical-b rounded cursor-pointer text-[rgb(var(--link-6))] hover:bg-[var(--color-fill-2)]">
            <i class="icon-park-outline-more"></i>
          </span>
        );
        return (
          <>
            <Link>编辑</Link>
            <Link>详情</Link>
            <Dropdown position="br">
              {{
                default: trigger,
                content: content,
              }}
            </Dropdown>
          </>
        );
      };
    }

    columns.push({ ...config.columnBase, ...column });
  }

  /**
   * 新增表单处理
   */
  if (options.create) {
    options.create = useFormModal(options.create as any) as any;
  }

  /**
   * 搜索表单的处理
   */
  if (options.search && options.search.items) {
    const searchItems: any[] = [];
    const createItems = options.create?.items ?? [];
    for (const item of options.search.items) {
      if (item.extend) {
        const createItem = createItems.find((i) => i.field === item.extend);
        if (createItem) {
          searchItems.push(merge({}, createItem, item));
          continue;
        }
      }
      const onSearch = item.searchable ? () => getTable().reloadData() : undefined;
      const onPressEnter = item.enterable ? () => getTable().reloadData() : undefined;
      searchItems.push(merge({ nodeProps: { onSearch, onPressEnter } }, item));
    }
    if (options.search.button !== false) {
      searchItems.push(config.searchItemSubmit);
    }
    options.search.items = searchItems;
  }

  /**
   * 修改表单处理
   */
  if (options.modify) {
    if (options.modify.extend && options.create) {
      const createItems = options.create.items;
      const modifyItems = options.modify.items;
      if (modifyItems && createItems) {
        for (let i = 0; i < modifyItems.length; i++) {
          if (modifyItems[i].extend) {
            modifyItems[i] = merge({}, createItems[i], modifyItems[i]);
          }
        }
      }
      const merged = merge(
        { modalProps: { titleAlign: "start", closable: false }, model: { id: undefined } },
        options.create,
        options.modify
      );
      options.modify = useFormModal(merged as any) as any;
    } else {
      options.modify = useFormModal(options.modify as any) as any;
    }
  }

  return reactive({ ...options, columns });
};

/**
 * 提供操作的上下文
 */
interface TableContext {
  /**
   * 传递给表格的参数(响应式)
   */
  props: TableProps;
  /**
   * 表格实例
   */
  tableRef: Ref<TableInstance | null>;
  /**
   * 刷新表格
   */
  refresh: () => void;
  /**
   * 重置表格
   */
  reload?: () => void;
}

type TableReturnType = [
  /**
   * 绑定好参数的组件
   */
  Component,
  /**
   * 提供操作的上下文
   */
  TableContext
];

export const useAniTable = (options: UseTableOptions): TableReturnType => {
  const props = useTable(options);
  const tableRef = ref<TableInstance | null>(null);
  const context = {
    props,
    tableRef,
    refresh: () => tableRef.value?.reloadData(),
  };
  const aniTable = defineComponent({
    name: "AniTableWrapper",
    setup() {
      const onRef = (el: TableInstance) => (tableRef.value = el);
      return () => <Table ref={onRef} {...props}></Table>;
    },
  });
  return [aniTable, context];
};
