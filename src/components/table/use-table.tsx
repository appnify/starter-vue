import { Link, Message, Modal, TableColumnData } from "@arco-design/web-vue";
import { defaultsDeep, isArray, isFunction, merge } from "lodash-es";
import { reactive } from "vue";
import { useFormModal } from "../form";
import { TableInstance } from "./table";
import { config } from "./table.config";
import { UseTableOptions } from "./use-interface";

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
  for (const column of options.columns) {
    if (column.type === "index") {
      defaultsDeep(column, config.columnIndex);
    }

    if (column.type === "button" && isArray(column.buttons)) {
      if (options.modify) {
        const modifyAction = column.buttons.find((i) => i.type === "modify");
        if (modifyAction) {
          const { onClick } = modifyAction;
          modifyAction.onClick = (columnData) => {
            const fn = (data: Record<string, any>) => getTable()?.openModifyModal(data);
            if (isFunction(onClick)) {
              onClick(columnData, fn);
            } else {
              fn(columnData);
            }
          };
        } else {
          column.buttons.unshift({
            text: "修改",
            onClick: (data) => getTable()?.openModifyModal(data),
          });
        }
      }

      column.buttons = column.buttons?.map((action) => {
        let onClick = action?.onClick;
        if (action.type === "delete") {
          onClick = (data) => {
            Modal.warning({
              ...config.columnButtonDelete,
              onOk: async () => {
                try {
                  const resData: any = await action?.onClick?.(data);
                  resData.msg && Message.success(resData?.msg || "");
                  getTable()?.loadData();
                } catch (error: any) {
                  const message = error.response?.data?.message;
                  if (message) {
                    Message.warning(`提示：${message}`);
                  }
                }
              },
            });
          };
        }
        return { ...config.columnButtonBase, ...action, onClick } as any;
      });

      column.render = (columnData) => {
        return column.buttons?.map((btn) => {
          const onClick = () => btn.onClick?.(columnData);
          const disabled = () => btn.disabled?.(columnData);
          if (btn.visible && !btn.visible(columnData)) {
            return null;
          }
          return (
            <Link onClick={onClick} disabled={disabled()} {...btn.buttonProps}>
              {btn.text}
            </Link>
          );
        });
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
      searchItems.push(item);
    }
    searchItems.push(config.searchItemSubmit);
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
      const merged = merge({}, options.create, options.modify);
      options.modify = useFormModal(merged as any) as any;
    } else {
      options.modify = useFormModal(options.modify as any) as any;
    }
  }

  return reactive({ ...options, columns });
};
