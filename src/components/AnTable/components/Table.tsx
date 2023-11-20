import { AnForm, AnFormInstance, IAnForm } from '@/components/AnForm';
import { AnFormModal } from '@/components/AnForm/components/FormModal';
import AniEmpty from '@/components/empty/AniEmpty.vue';
import { FormModalProps } from '@/components/form';
import {
  TableColumnData as BaseColumn,
  TableData as BaseData,
  Table as BaseTable,
  Button,
  PaginationProps,
} from '@arco-design/web-vue';
import { isArray, isFunction, merge } from 'lodash-es';
import { PropType, defineComponent, ref } from 'vue';
import { PluginContainer } from '../hooks/useTablePlugin';

type DataFn = (filter: { page: number; size: number; [key: string]: any }) => any | Promise<any>;

/**
 * 表格组件
 */
export const AnTable = defineComponent({
  name: 'AnTable',
  props: {
    /**
     * 表格数据
     * @description 数组或者函数
     */
    data: {
      type: [Array, Function] as PropType<BaseData[] | DataFn>,
    },
    /**
     * 表格列
     */
    columns: {
      type: Array as PropType<BaseColumn[]>,
      default: () => [],
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
      type: Object as PropType<IAnForm>,
    },
    /**
     * 新建弹窗
     */
    create: {
      type: Object as PropType<FormModalProps>,
    },
    /**
     * 修改弹窗
     */
    modify: {
      type: Object as PropType<FormModalProps>,
    },
    /**
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<InstanceType<typeof BaseTable>['$props']>,
    },
    /**
     * 插件列表
     */
    pluginer: {
      type: Object as PropType<PluginContainer>,
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false);
    const tableRef = ref<InstanceType<typeof BaseTable>>();
    const renderData = ref<BaseData[]>([]);
    const searchRef = ref<AnFormInstance | null>(null);

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

      if (isArray(props.data)) {
        // todo
      }

      if (isFunction(props.data)) {
        try {
          loading.value = true;
          let params = { ...search, ...paging };
          params = props.pluginer?.callBeforeSearchHook(params) ?? params;
          const resData = await props.data(params);
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
      if (Array.isArray(props.data)) {
        renderData.value = props.data;
        resetPaging();
      }
    });

    onMounted(() => {
      loadData();
    });

    const onPageChange = (page: number) => {
      props.pluginer?.callPageChangeHook(page);
      setPaging({ current: page });
      loadData();
    };

    const onPageSizeChange = (size: number) => {
      props.pluginer?.callSizeChangeHook(size);
      setPaging({ current: 1, pageSize: size });
      loadData();
    };

    const state = {
      loading,
      tableRef,
      searchRef,
      renderData,
      loadData,
      reload,
      refresh,
      onPageChange,
      onPageSizeChange,
      props,
    };

    props.pluginer?.callSetupHook(state);

    provide('ref:table', { ...state, ...props });

    return state;
  },
  render() {
    return (
      <div class="table w-full">
        <div class={`mb-3 flex gap-2 toolbar justify-between`}>
          {this.create && <AnFormModal {...(this.create as any)}></AnFormModal>}
          {this.pluginer?.actions && (
            <div class={`flex-1 flex gap-2 items-center`}>
              {this.pluginer.actions.map(Action => (
                <Action />
              ))}
            </div>
          )}
          <div>
            {this.search && (
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
            )}
          </div>
          <div class="flex gap-2">
            <div class="flex gap-1">{this.pluginer?.widgets && this.pluginer.widgets?.map(Widget => <Widget />)}</div>
          </div>
        </div>

        <BaseTable
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
            empty: () => <AniEmpty />,
            ...this.$slots,
          }}
        </BaseTable>
      </div>
    );
  },
});

/**
 * 表格组件实例
 */
export type TableInstance = InstanceType<typeof AnTable>;

/**
 * 表格组件参数
 */
export type TableProps = TableInstance['$props'];
