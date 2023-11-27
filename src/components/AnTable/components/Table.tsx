import {
  AnForm,
  AnFormInstance,
  AnFormModal,
  AnFormModalInstance,
  AnFormModalProps,
  AnFormProps,
} from '@/components/AnForm';
import AnEmpty from '@/components/AnEmpty/AnEmpty.vue';
import { Button, PaginationProps, Table, TableColumnData, TableData, TableInstance } from '@arco-design/web-vue';
import { isArray, isFunction, merge } from 'lodash-es';
import { InjectionKey, PropType, Ref, defineComponent, ref } from 'vue';
import { PluginContainer } from '../hooks/useTablePlugin';

type DataFn = (filter: { page: number; size: number; [key: string]: any }) => any | Promise<any>;

export type ArcoTableProps = Omit<
  TableInstance['$props'],
  'ref' | 'pagination' | 'loading' | 'data' | 'onPageChange' | 'onPageSizeChange'
>;

export const AnTableContextKey = Symbol('AnTableContextKey') as InjectionKey<AnTableContext>;

/**
 * 表格组件
 */
export const AnTable = defineComponent({
  name: 'AnTable',
  props: {
    /**
     * 表格列
     */
    columns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    /**
     * 表格数据
     * @description 数组或者函数
     */
    source: {
      type: [Array, Function] as PropType<TableData[] | DataFn>,
    },
    /**
     * 分页配置
     */
    paging: {
      type: Object as PropType<PaginationProps & { hide?: boolean }>,
    },
    /**
     * 搜索表单
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
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<ArcoTableProps>,
    },
    /**
     * 插件列表
     */
    pluginer: {
      type: Object as PropType<PluginContainer>,
    },
  },
  setup(props) {
    const loading = ref(false);
    const renderData = ref<TableData[]>([]);
    const tableRef = ref<TableInstance | null>(null);
    const searchRef = ref<AnFormInstance | null>(null);
    const createRef = ref<AnFormModalInstance | null>(null);
    const modifyRef = ref<AnFormModalInstance | null>(null);

    const useTablePaging = () => {
      const getPaging = () => {
        return {
          page: props.paging?.current ?? 1,
          size: props.paging?.pageSize ?? 10,
        };
      };

      const setPaging = (paging: PaginationProps) => {
        if (props.paging) {
          merge(props.paging, paging);
        }
      };

      const resetPaging = () => {
        setPaging({ current: 1, pageSize: 10 });
      };

      return {
        getPaging,
        setPaging,
        resetPaging,
      };
    };

    const { getPaging, setPaging, resetPaging } = useTablePaging();

    const loadData = async () => {
      if (await searchRef.value?.validate()) {
        return;
      }

      const paging = getPaging();
      const search = searchRef.value?.getModel() ?? {};

      if (isArray(props.source)) {
        // todo
      }

      if (isFunction(props.source)) {
        try {
          loading.value = true;
          let params = { ...search, ...paging };
          params = props.pluginer?.callLoadHook(params) ?? params;
          let resData = await props.source(params);
          resData = props.pluginer?.callLoadedHook(resData) ?? params;
          const { data = [], total = 0 } = resData?.data || {};
          renderData.value = data;
          setPaging({ total });
        } catch (e) {
          // todo
        } finally {
          loading.value = false;
        }
      }
    };

    const reload = () => {
      setPaging({ current: 1, pageSize: 10 });
      return loadData();
    };

    const refresh = () => {
      return loadData();
    };

    watchEffect(() => {
      if (Array.isArray(props.source)) {
        renderData.value = props.source;
        resetPaging();
      }
    });

    onMounted(() => {
      loadData();
    });

    const onPageChange = (page: number) => {
      setPaging({ current: page });
      loadData();
    };

    const onPageSizeChange = (size: number) => {
      setPaging({ current: 1, pageSize: size });
      loadData();
    };

    const context: AnTableContext = {
      loading,
      renderData,
      tableRef,
      searchRef,
      createRef,
      modifyRef,
      loadData,
      reload,
      refresh,
      onPageChange,
      onPageSizeChange,
      props,
    };

    props.pluginer?.callSetupHook(context);
    provide(AnTableContextKey, context);

    return context;
  },
  render() {
    return (
      <div class="an-table table w-full">
        <div class={`mb-3 flex gap-2 toolbar justify-between`}>
          {this.create && <AnFormModal {...this.create} ref="createRef" onSubmited={this.reload}></AnFormModal>}
          {this.modify && (
            <AnFormModal {...this.modify} trigger={false} ref="modifyRef" onSubmited={this.refresh}></AnFormModal>
          )}
          {this.$slots.action?.(this.renderData)}
          {this.pluginer?.actions && (
            <div class={`flex-1 flex gap-2 items-center`}>
              {this.pluginer.actions.map(Action => (
                <Action />
              ))}
            </div>
          )}
          {this.search && (
            <div>
              <AnForm
                ref="searchRef"
                v-model:model={this.search.model}
                items={this.search.items}
                formProps={this.search.formProps}
              >
                {{
                  submit: () => (
                    <Button type="primary" loading={this.loading} onClick={this.reload}>
                      {{
                        default: () => '查询',
                        icon: () => <i class="icon-park-outline-search"></i>,
                      }}
                    </Button>
                  ),
                }}
              </AnForm>
            </div>
          )}
          {this.pluginer?.widgets && (
            <div class="flex gap-2">
              {this.pluginer.widgets.map(Widget => (
                <Widget />
              ))}
            </div>
          )}
        </div>

        <Table
          row-key="id"
          bordered={false}
          {...this.$attrs}
          {...this.tableProps}
          ref="tableRef"
          loading={this.loading}
          pagination={this.paging?.hide ? false : this.paging}
          data={this.renderData}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
        >
          {{
            empty: () => <AnEmpty />,
            ...this.$slots,
          }}
        </Table>
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
export type AnTableProps = Pick<
  AnTableInstance['$props'],
  'source' | 'columns' | 'search' | 'paging' | 'create' | 'modify' | 'tableProps' | 'pluginer'
>;

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
