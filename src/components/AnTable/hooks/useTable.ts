import { FormModalUseOptions } from "../../AnForm/hooks/useFormModal";
import { ModifyForm } from "./useModiyForm";
import { SearchForm } from "./useSearchForm";
import { TableColumn } from "./useTableColumn";

export interface TableUseOptions {
  /**
   * 表格列
   */
  columns?: TableColumn[];
  /**
   * 搜索表单
   */
  search?: SearchForm;
  /**
   * 新建弹窗
   */
  create?: FormModalUseOptions;
  /**
   * 新建弹窗
   */
  modify?: ModifyForm;
  /**
   * 详情弹窗
   */
  detail?: any;
  /**
   * 批量删除
   */
  delete?: any;
}

export function useTable(options: TableUseOptions) {
  return 0;
}

useTable({
  columns: [
    {
      title: '测试',
      type: 'index'
    }
  ]
})