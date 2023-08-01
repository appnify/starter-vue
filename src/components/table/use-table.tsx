import { Link, Message, Modal, TableColumnData } from "@arco-design/web-vue";
import { defaultsDeep, isArray, isFunction, mergeWith } from "lodash-es";
import { reactive } from "vue";
import { useFormModal } from "../form";
import { TableInstance } from "./table";
import { config } from "./table.config";
import { UseTableOptions } from "./use-interface";

const merge = (...args: any[]) => {
  return mergeWith({}, ...args, (obj: any, src: any) => {
    if (Array.isArray(obj) && Array.isArray(src)) {
      return obj.concat(src);
    }
    return undefined;
  });
};

const has = (obj: any, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const propTruly = (obj: any, key: string) => !has(obj, key) || !!obj[key];

/**
 * 提供便捷语法，构建传给Table组件的参数
 * @see src/components/table/use-table.tsx
 */
export const useTable = (optionsOrFn: UseTableOptions | (() => UseTableOptions)): any => {
  const options: UseTableOptions = typeof optionsOrFn === "function" ? optionsOrFn() : optionsOrFn;
  const columns: TableColumnData[] = [];

  const getTable = (): TableInstance => (columns as any).instance;

  /**
   * 表格列处理
   */
  options.columns.forEach((column) => {
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
                const resData: any = await action?.onClick?.(data);
                resData.msg && Message.success(resData?.msg || "");
                getTable()?.loadData();
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
  });

  const itemsMap = options.common?.items?.reduce((map, item) => {
    map[item.field] = item;
    return map;
  }, {} as any);

  /**
   * 搜索表单的处理
   */
  if (options.search && options.search.items) {
    const searchItems: any[] = [];
    for (const item of options.search.items) {
      if (typeof item === "string") {
        if (!itemsMap[item]) {
          throw new Error(`search item ${item} not found in common items`);
        }
        searchItems.push(itemsMap[item]);
        continue;
      }
      if ("extend" in item && item.extend && itemsMap[item.extend]) {
        searchItems.push(merge({}, itemsMap[item.extend], item));
        continue;
      }
      searchItems.push(item);
    }
    searchItems.push(config.searchItemSubmit);
    options.search.items = searchItems;
  }

  /**
   * 新增表单处理
   */
  if (options.create && propTruly(options.create, "extend")) {
    options.create = useFormModal(merge(options.common, options.create)) as any;
  }

  /**
   * 修改表单处理
   */
  if (options.modify && propTruly(options.modify, "extend")) {
    options.modify = useFormModal(merge(options.common, options.modify)) as any;
  }

  return reactive({ ...options, columns });
};
