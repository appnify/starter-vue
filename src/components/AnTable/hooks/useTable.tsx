import { FormModalUseOptions, useFormModalProps } from '../../AnForm/hooks/useFormModal';
import { AnTable, TableProps } from '../components/Table';
import { ModifyForm, useModifyForm } from './useModiyForm';
import { SearchForm, useSearchForm } from './useSearchForm';
import { TableColumn, useTableColumns } from './useTableColumn';
import { AnTablePlugin, PluginContainer } from './useTablePlugin';

export interface TableUseOptions extends Pick<TableProps, 'data' | 'tableProps' | 'paging'> {
  /**
   * 唯一ID
   * @example
   * ```ts
   * 'UserTable'
   * ```
   */
  id?: string;
  /**
   * 插件列表
   * @example
   * ```ts
   * [useRefresh()]
   * ```
   */
  plugins?: AnTablePlugin[];
  /**
   * 表格列
   * @example
   * ```ts
   * [{
   *     dataIndex: 'title',
   *     title: '标题'
   * }]
   * ```
   */
  columns?: TableColumn[];
  /**
   * 搜索表单
   * @example
   * ```ts
   * [{
   *     field: 'name',
   *     label: '用户名称',
   *     setter: 'input'
   * }]
   * ```
   */
  search?: SearchForm;
  /**
   * 新建弹窗
   * @example
   * ```ts
   * {
   *   title: '添加用户',
   *   items: [],
   *   submit: (model) => {}
   * }
   * ```
   */
  create?: FormModalUseOptions;
  /**
   * 修改弹窗
   * @example
   * ```ts
   * {
   *   extend: true, // 基于新建弹窗扩展
   *   title: '修改用户',
   *   submit: (model) => {}
   * }
   * ```
   */
  modify?: ModifyForm;
}

export function useTableProps(options: TableUseOptions) {
  const { columns } = useTableColumns(options.columns ?? []);
  const paging = ref({ hide: false, showTotal: true, showPageSize: true, ...(options.paging ?? {}) });
  const search = options.search && useSearchForm(options.search);
  const create = options.create && useFormModalProps(options.create);
  const modify = options.modify && useModifyForm(options);
  const props = reactive({
    data: options.data,
    tableProps: options.tableProps,
    columns,
    search,
    paging,
    create,
    modify,
  });
  props;
}

export function useTable(options: TableUseOptions) {
  const tableRef = ref<InstanceType<typeof AnTable> | null>(null);
  const pluginer = new PluginContainer(options.plugins ?? []);
  options = pluginer.callOptionsHook(options);

  const { columns } = useTableColumns(options.columns ?? []);
  const data = ref(options.data);
  const pagination = ref({ hide: false, showTotal: true, showPageSize: true, ...(options.paging ?? {}) });
  const tableProps = ref(options.tableProps ?? {});
  const searchProps = useSearchForm(options.search);
  const create = options.create && useFormModalProps(options.create);

  const AnTabler = () => (
    <AnTable
      ref={(el: any) => (tableRef.value = el)}
      columns={columns.value}
      data={data.value}
      paging={pagination.value}
      tableProps={tableProps.value}
      search={searchProps.value}
      pluginer={pluginer}
      create={create as any}
    ></AnTable>
  );

  return {
    component: AnTabler,
    columns,
    tableRef,
  };
}
