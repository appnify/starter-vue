import { IAnForm } from '@/components/AnForm';
import AniEmpty from '@/components/empty/AniEmpty.vue';
import { FormModalProps } from '@/components/form';
import {
  TableColumnData as BaseColumn,
  TableData as BaseData,
  Table as BaseTable,
  Button,
  PaginationProps,
} from '@arco-design/web-vue';
import { merge } from 'lodash-es';
import { PropType, defineComponent, ref } from 'vue';
import { TableColumnConfig } from './TableColumnConfig';

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
    pagination: {
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
  },
  setup(props) {
    const loading = ref(false);
    const tableRef = ref<InstanceType<typeof BaseTable>>();
    const renderData = ref<BaseData[]>([]);
    const reloadData = () => loadData();

    const useTablePaging = () => {
      const getPaging = () => {
        return {
          page: props.pagination?.current ?? 1,
          size: props.pagination?.pageSize ?? 10,
        };
      };

      const setPaging = (paging: PaginationProps) => {
        if (props.pagination) {
          merge(props.pagination, paging);
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

    /**
     * 加载数据
     * @param pagination 自定义分页
     */
    const loadData = async () => {
      const paging = getPaging();
      if (typeof props.data === 'function') {
        try {
          loading.value = true;
          const resData = await props.data({ ...paging });
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
      setPaging({ current: page });
      loadData();
    };

    const onPageSizeChange = (size: number) => {
      setPaging({ current: 1, pageSize: size });
      loadData();
    };

    const state = {
      loading,
      tableRef,
      renderData,
      loadData,
      reloadData,
      onPageChange,
      onPageSizeChange,
    };

    provide('ref:table', { ...state, ...props });

    return state;
  },
  render() {
    (this.columns as any).instance = this;
    return (
      <div class="table w-full">
        <div class={`mb-3 flex toolbar justify-between`}>
          <div class={`flex-1 flex gap-2 `}>
            <Button type='primary'>{{ icon: () => <i class="icon-park-outline-add"></i>, default: () => '新增' }}</Button>
          </div>
          <div>
            <div class="flex gap-1">
              <Button loading={this.loading} onClick={this.loadData}>
                {{ icon: () => <span class="icon-park-outline-redo"></span> }}
              </Button>
              <TableColumnConfig columns={this.columns} />
            </div>
          </div>
        </div>

        <BaseTable
          row-key="id"
          bordered={false}
          {...this.$attrs}
          {...this.tableProps}
          ref="tableRef"
          loading={this.loading}
          pagination={this.pagination?.hide ? false : this.pagination}
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
