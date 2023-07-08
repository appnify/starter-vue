import { Link, TableColumnData, TableData } from "@arco-design/web-vue";
import { FormModalProps, FormProps } from "../form";
import { IFormItem } from "../form/form-item";
import { TableProps } from "./table";

interface UseColumnRenderOptions {
  /**
   * 当前行数据
   */
  record: TableData;
  /**
   * 当前列配置
   */
  column: TableColumnData;
  /**
   * 当前行索引
   */
  rowIndex: number;
}

export interface TableColumnButton {
  /**
   * button text
   */
  text?: string;

  /**
   * button type
   */
  type?: "delete" | "modify";

  /**
   * onClick callback
   */
  onClick?: (data: UseColumnRenderOptions, openModify?: (model: Record<string, any>) => void) => void;

  /**
   * disable button dynamicly
   */
  disabled?: (data: UseColumnRenderOptions) => boolean;

  /**
   * show or hide button dynamicly
   */
  visible?: (data: UseColumnRenderOptions) => boolean;

  /**
   * props for `Button`
   */
  buttonProps?: Partial<Omit<InstanceType<typeof Link>["$props"], "onClick" | "disabled">>;
}

export interface UseTableColumn extends TableColumnData {
  /**
   * column type
   */
  type?: "index" | "button";

  /**
   * only for `type: "button"`
   */
  buttons?: TableColumnButton[];
}

type ExtendableFormItem = (
  | string
  | ({
      /**
       * 继承common.items中指定field值的项
       */
      extend: string;
    } & Partial<IFormItem>)
  | IFormItem
)[];

export interface UseTableOptions extends Omit<TableProps, "search" | "create" | "modify" | "columns"> {
  /**
   * columns config, extends from `TableColumnData`
   * @see https://arco.design/web-vue/components/table/#tablecolumn
   */
  columns: UseTableColumn[];
  /**
   * search form config
   * @see FormProps
   */
  search?: Partial<{
    [k in keyof FormProps]: k extends "items" ? ExtendableFormItem : FormProps[k];
  }>;
  /**
   * common props for `create` and `modify` modal
   * @see FormModalProps
   */
  common?: Partial<FormModalProps>;
  /**
   * 新建弹窗配置
   */
  create?: Partial<
    {
      [k in keyof FormModalProps]: k extends "items"
        ? (string | (IFormItem & { extend: string }))[]
        : FormModalProps[k];
    } & { extend: boolean }
  >;
  /**
   * 新建弹窗配置
   */
  modify?: Partial<
    { [k in keyof FormModalProps]: k extends "items" ? (string | IFormItem)[] : FormModalProps[k] } & {
      extend: boolean;
    }
  >;
  /**
   * 详情弹窗配置
   */
  detail?: any;
}
