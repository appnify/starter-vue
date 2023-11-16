import { FormModalUseOptions } from '../../AnForm/hooks/useFormModal';
import { AnTable, TableProps } from '../components/Table';
import { ModifyForm } from './useModiyForm';
import { SearchForm } from './useSearchForm';
import { TableColumn, useTableColumns } from './useTableColumn';

export interface TableUseOptions extends Pick<TableProps, 'data' | 'tableProps' | 'pagination'> {
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
  const { columns } = useTableColumns(options.columns ?? []);
  const data = ref(options.data);
  const pagination = ref({ hide: false, showTotal: true, showPageSize: true, ...(options.pagination ?? {}) });
  const tableProps = ref(options.tableProps ?? {});
  const tableRef = ref<InstanceType<typeof AnTable> | null>(null);

  const AnTabler = () => (
    <AnTable
      ref={(el: any) => (tableRef.value = el)}
      columns={columns.value}
      data={data.value}
      pagination={pagination.value}
      tableProps={tableProps.value}
    ></AnTable>
  );

  return {
    component: AnTabler,
    columns,
    tableRef,
  };
}
