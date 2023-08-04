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
   * 按钮文本
   */
  text?: string;

  /**
   * 操作类型
   * @description `delete` 需配置`onClick`属性，`modify` 需配置根对象下的 `modify` 属性
   */
  type?: "delete" | "modify";

  /**
   * 处理函数
   */
  onClick?: (data: UseColumnRenderOptions, openModify?: (model: Record<string, any>) => void) => void;

  /**
   * 是否禁用按钮
   */
  disabled?: (data: UseColumnRenderOptions) => boolean;

  /**
   * 是否显示按钮
   */
  visible?: (data: UseColumnRenderOptions) => boolean;

  /**
   * 传递给按钮的props
   */
  buttonProps?: Partial<Omit<InstanceType<typeof Link>["$props"], "onClick" | "disabled">>;
}

export interface UseTableColumn extends TableColumnData {
  /**
   * 表格列类型
   */
  type?: "index" | "button";

  /**
   * 按钮配置列表
   */
  buttons?: TableColumnButton[];
}

export interface UseTableOptions extends Omit<TableProps, "search" | "create" | "modify" | "columns"> {
  /**
   * 表格列配置
   * @see https://arco.design/web-vue/components/table/#tablecolumn
   */
  columns: UseTableColumn[];
  /**
   * 搜索表单配置
   * @see FormProps
   */
  search?: Partial<
    Omit<FormProps, "items"> & {
      /**
       * 表单项
       */
      items?: (Partial<IFormItem> & {
        /**
         * 继承`create.items`中指定field值的项
         */
        extend?: string;
      })[];
    }
  >;
  /**
   * common props for `create` and `modify` modal
   * @see FormModalProps
   */
  common?: Partial<FormModalProps>;
  /**
   * 新建弹窗配置
   */
  create?: Partial<FormModalProps>;
  /**
   * 新建弹窗配置
   */
  modify?: Partial<
    Omit<FormModalProps, "items"> & {
      /**
       * 是否继承`create`弹窗配置
       */
      extend: boolean;
      items?: (FormModalProps["items"][number] & {
        /**
         * 继承`create.items`弹窗配置中指定field值的项
         */
        extend?: string;
      })[];
    }
  >;
  /**
   * 详情弹窗配置
   */
  detail?: any;
}
