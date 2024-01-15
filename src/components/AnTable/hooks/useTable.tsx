import { useFormModalProps } from '@/components/AnForm';
import { AnTable, AnTableInstance, AnTableProps } from '../components/Table';
import { ModifyForm, useModifyForm } from './useModiyForm';
import { SearchForm, SearchFormItem, useSearchForm } from './useSearchForm';
import { TableColumn, useTableColumns } from './useTableColumn';
import { AnTablePlugin, PluginContainer } from './useTablePlugin';
import { UseCreateFormOptions } from './useCreateForm';
import { FunctionalComponent } from 'vue';

export interface TableUseOptions extends Pick<AnTableProps, 'source' | 'tableProps' | 'paging'> {
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
   *   dataIndex: 'title',
   *   title: '标题'
   * }]
   * ```
   */
  columns?: TableColumn[];
  actions?: any[];
  /**
   * 搜索表单
   * @example
   * ```ts
   * [{
   *   field: 'name',
   *   label: '用户名称',
   *   setter: 'input'
   * }]
   * ```
   */
  search?: SearchForm | SearchFormItem[];
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
  create?: UseCreateFormOptions;
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

export function useTableProps(options: TableUseOptions): AnTableProps {
  const { source, tableProps } = options;

  const columns = useTableColumns(options.columns ?? []);
  const paging = { hide: false, showTotal: true, showPageSize: true, ...(options.paging ?? {}) };
  const search = options.search && useSearchForm(options.search);
  const create = options.create && useFormModalProps(options.create);
  const modify = options.modify && useModifyForm(options, create?.model ?? {} );

  return {
    tableProps,
    columns,
    source,
    search,
    paging,
    create,
    modify,
  };
}

export function useTable(options: TableUseOptions) {
  const tableRef = ref<AnTableInstance | null>(null);
  if (!options.plugins) {
    options.plugins = [];
  }
  const pluginer = new PluginContainer(options.plugins);
  options = pluginer.callOptionsHook(options);

  const rawProps = useTableProps(options);
  const props = reactive(rawProps);

  const AnTabler: FunctionalComponent = (_, { slots }) => (
    <AnTable
      ref={(el: any) => (tableRef.value = el)}
      tableProps={props.tableProps}
      columns={props.columns}
      source={props.source}
      paging={props.paging}
      search={props.search}
      create={props.create as any}
      modify={props.modify as any}
      pluginer={pluginer}
    >
      {slots}
    </AnTable>
  );

  return {
    component: AnTabler,
    tableRef,
    props,
  };
}
