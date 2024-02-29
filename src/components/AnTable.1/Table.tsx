import { AnForm, AnFormInstance, AnFormModal, AnFormModalInstance, AnFormModalProps, AnFormProps, getModel } from '@/components/AnForm';
import AnEmpty from '@/components/AnEmpty/AnEmpty.vue';
import { Button, PaginationProps, Table, TableColumnData, TableData, TableInstance } from '@arco-design/web-vue';
import { isArray, merge } from 'lodash-es';
import { InjectionKey, PropType, Ref, VNodeChild, defineComponent, ref } from 'vue';

type DataFn = (params: { page: number; size: number; [key: string]: any }) => any | Promise<TableData[] | { data: TableData[]; total: number }>;
export type ArcoTableProps = Omit<TableInstance['$props'], 'ref' | 'pagination' | 'loading' | 'data'>;
export const AnTableContextKey = Symbol('AnTableContextKey') as InjectionKey<AnTableContext>;
export type TableColumnRender = (data: { record: TableData; column: TableColumnData; rowIndex: number }) => VNodeChild;

export type ArcoTableSlots = {
  /**
   * 自定义 th 元素
   */
  th?: (column: TableColumnData) => any;

  /**
   * 自定义 thead 元素
   */
  thead?: () => any;

  /**
   * 空白展示
   */
  empty?: () => any;

  /**
   * 总结行
   */
  'summary-cell'?: (column: TableColumnData, record: TableData, rowIndex: number) => any;

  /**
   * 分页器右侧内容
   */
  'pagination-right'?: () => any;

  /**
   * 分页器左侧内容
   */
  'pagination-left'?: () => any;

  /**
   * 自定义 td 元素
   */
  td?: (column: TableColumnData, record: TableData, rowIndex: number) => any;

  /**
   * 自定义 tr 元素
   */
  tr?: (column: TableColumnData, record: TableData, rowIndex: number) => any;

  /**
   * 自定义 tbody 元素
   */
  tbody?: () => any;

  /**
   * 拖拽锚点图标
   */
  'drag-handle-icon'?: () => any;

  /**
   * 表格底部
   */
  footer?: () => any;

  /**
   *  展开行内容
   */
  'expand-row'?: () => any;

  /**
   * 展开行图标
   */
  'expand-icon'?: () => any;

  /**
   * 表格列定义。启用时会屏蔽 columns 属性
   */
  columns?: () => any;
};

/**
 * 表格组件
 */
export const AnTable = defineComponent({
  name: 'AnTable',
  props: {
    /**
     * 表格数据
     * @description 数组或函数，函数请返回数组或 `{ data, total }` 对象
     * @example
     * ```ts
     * async data(params) {
     *   const res = await api.xxx(params);
     *   const { data, total } = res;
     *   return { data, total }
     * }
     * ```
     */
    data: {
      type: [Array, Function] as PropType<TableData[] | DataFn>,
    },
    /**
     * 表格列
     * @example
     * ```ts
     * [
     *   {
     *     title: "名字",
     *     dataIndex: "name"
     *   }
     * ]
     * ```
     */
    columns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    /**
     * 分页配置
     * @example
     * ```ts
     * {
     *   showTotal: true
     * }
     * ```
     */
    paging: {
      type: Object as PropType<PaginationProps & { hide?: boolean }>,
    },
    /**
     * 搜索表单
     * @example
     * ```ts
     * [
     *   {
     *     label: "姓名关键字",
     *     setter: "input",
     *   }
     * ]
     * ```
     */
    search: {
      type: Object as PropType<AnFormProps>,
    },
    /**
     * 新建弹窗
     */
    create: {
      type: Object as PropType<AnFormModalProps>,
    },
    /**
     * 修改弹窗
     */
    modify: {
      type: Object as PropType<AnFormModalProps>,
    },
    /**
     * 操作按钮
     */
    actions: {
      type: Array as PropType<any[]>,
    },
    /**
     * 部件
     */
    widgets: {
      type: Array as PropType<any[]>,
    },
    /**
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<ArcoTableProps>,
    },
    /**
     * 传递给 Table 组件的插槽
     */
    tableSlots: {
      type: Object as PropType<ArcoTableSlots>,
    },
  },
  setup(props) {
    const loading = ref(false);
    const renderData = ref<TableData[]>([]);
    const tableRef = ref<TableInstance | null>(null);
    const searchRef = ref<AnFormInstance | null>(null);
    const createRef = ref<AnFormModalInstance | null>(null);
    const modifyRef = ref<AnFormModalInstance | null>(null);
    const selected = ref<TableData[]>([]);
    const selectedKeys = computed(() => selected.value.map(i => i[props.tableProps?.rowKey ?? 'id']));

    const setPaging = (paging: PaginationProps) => {
      if (props.paging) {
        merge(props.paging, paging);
      }
    };

    const resetPaging = () => {
      setPaging({ current: 1, pageSize: 10 });
    };

    const loadData = async () => {
      if (!props.data || Array.isArray(props.data)) {
        return;
      }

      if (await searchRef.value?.validate()) {
        return;
      }

      const page = props.paging?.current ?? 1;
      const size = props.paging?.pageSize ?? 10;
      const search = getModel(props.search?.model ?? {});

      loading.value = true;
      try {
        const params = { ...search, page, size };
        const resData = await props.data(params);
        if (resData) {
          let data: TableData[] = [];
          let total = 0;
          if (isArray(resData)) {
            data = resData;
            total = resData.length;
          } else {
            data = resData.data ?? [];
            total = resData.total ?? 0;
          }
          renderData.value = data;
          props.paging?.showTotal && (props.paging.total = total);
        }
      } catch (e) {
        console.log('AnTable load fail: ', e);
      }
      loading.value = false;
    };

    const load = (page?: number, size?: number) => {
      if (props.paging) {
        page && (props.paging.current = page);
        size && (props.paging.pageSize = size);
      }
      loadData();
    };

    const reload = () => load(1, 10);

    watchEffect(() => {
      if (Array.isArray(props.data)) {
        renderData.value = props.data;
        resetPaging();
      }
    });

    onMounted(() => {
      loadData();
    });

    return {
      loading,
      renderData,
      selected,
      selectedKeys,
      tableRef,
      searchRef,
      createRef,
      modifyRef,
      load,
      reload,
      refresh: loadData,
    };
  },
  render() {
    return (
      <div class="an-table table w-full">
        {(this.create || this.actions || this.search || this.widgets) && (
          <div class={`mb-3 flex gap-2 toolbar justify-between`}>
            {this.create && <AnFormModal {...this.create} ref="createRef" onSubmited={this.reload}></AnFormModal>}
            {this.actions && <div class={`flex-1 flex gap-2 items-center`}>{this.actions.map(action => action())}</div>}
            {this.search && (
              <div>
                <AnForm ref="searchRef" v-model:model={this.search.model} items={this.search.items} formProps={this.search.formProps}></AnForm>
              </div>
            )}
            {this.widgets && <div class="flex gap-2">{this.widgets.map(widget => widget())}</div>}
          </div>
        )}

        <Table
          row-key="id"
          bordered={false}
          {...this.tableProps}
          ref="tableRef"
          loading={this.loading}
          pagination={this.paging?.hide ? false : this.paging}
          data={this.renderData}
          columns={this.columns}
        >
          {{
            empty: () => <AnEmpty />,
            ...this.tableSlots,
          }}
        </Table>

        {this.modify && <AnFormModal {...this.modify} trigger={false} ref="modifyRef" onSubmited={this.refresh}></AnFormModal>}
      </div>
    );
  },
});

/**
 * 表格组件实例
 */
export type AnTableInstance = InstanceType<typeof AnTable>;

/**
 * 表格组件参数
 */
export type AnTableProps = Pick<AnTableInstance['$props'], 'data' | 'columns' | 'search' | 'paging' | 'create' | 'modify' | 'tableProps' | 'tableSlots' | 'actions' | 'widgets'>;

export interface AnTableContext {
  /**
   * 是否加载中
   */
  loading: Ref<boolean>;
  /**
   * 表格实例
   */
  tableRef: Ref<TableInstance | null>;
  /**
   * 搜索表单实例
   */
  searchRef: Ref<AnFormInstance | null>;
  /**
   * 新增弹窗实例
   */
  createRef: Ref<AnFormModalInstance | null>;
  /**
   * 修改弹窗实例
   */
  modifyRef: Ref<AnFormModalInstance | null>;
  /**
   * 当前表格数据
   */
  renderData: Ref<TableData[]>;
  /**
   * 加载数据
   */
  loadData: () => Promise<void>;
  /**
   * 重置加载
   */
  reload: () => Promise<void>;
  /**
   * 重新加载
   */
  refresh: () => Promise<void>;
  /**
   * 原表格参数
   */
  props: AnTableProps;
  onPageChange: any;
  onPageSizeChange: any;
}
