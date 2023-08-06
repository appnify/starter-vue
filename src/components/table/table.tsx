import {
  TableColumnData as BaseColumn,
  TableData as BaseData,
  Table as BaseTable,
  Message,
} from "@arco-design/web-vue";
import { merge } from "lodash-es";
import { PropType, computed, defineComponent, reactive, ref, watch } from "vue";
import { Form, FormInstance, FormModal, FormModalInstance, FormModalProps, FormProps } from "../form";
import { config } from "./table.config";

type DataFn = (search: Record<string, any>, paging: { page: number; size: number }) => Promise<any>;

/**
 * 表格组件
 * @see src/components/table/table.tsx
 */
export const Table = defineComponent({
  name: "Table",
  props: {
    /**
     * 表格数据
     * @description 可以是数组或者函数，函数返回值为`{ data: BaseData[], total: number }`类型
     */
    data: {
      type: [Array, Function] as PropType<BaseData[] | DataFn>,
    },
    /**
     * 表格列设置
     */
    columns: {
      type: Array as PropType<BaseColumn[]>,
      default: () => [],
    },
    /**
     * 分页参数配置
     */
    pagination: {
      type: Object as PropType<any>,
      default: () => reactive(config.pagination),
    },
    /**
     * 搜索表单配置
     */
    search: {
      type: Object as PropType<FormProps>,
    },
    /**
     * 新建弹窗配置
     */
    create: {
      type: Object as PropType<FormModalProps>,
    },
    /**
     * 修改弹窗配置
     */
    modify: {
      type: Object as PropType<FormModalProps>,
    },
    /**
     * 详情弹窗配置
     */
    detail: {
      type: Object as PropType<any>,
    },
    /**
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<InstanceType<typeof BaseTable>["$props"]>,
    },
  },
  setup(props) {
    const loading = ref(false);
    const searchRef = ref<FormInstance>();
    const createRef = ref<FormModalInstance>();
    const modifyRef = ref<FormModalInstance>();
    const renderData = ref<BaseData[]>([]);
    const inlined = computed(() => (props.search?.items?.length ?? 0) < 4);
    const reloadData = () => loadData({ current: 1, pageSize: 10 });
    const openModifyModal = (data: any) => modifyRef.value?.open(data.record);

    const loadData = async (pagination: Partial<any> = {}) => {
      const merged = { ...props.pagination, ...pagination };
      const paging = { page: merged.current, size: merged.pageSize };
      const model = searchRef.value?.getModel() ?? {};
      if (Array.isArray(props.data)) {
        const filters = Object.entries(model);
        const data = props.data.filter((item) => {
          return filters.every(([key, value]) => {
            if (typeof value === "string") {
              return item[key].includes(value);
            }
            return item[key] === value;
          });
        });
        renderData.value = data;
        props.pagination.total = renderData.value.length;
        props.pagination.current = 1;
      }
      if (typeof props.data === "function") {
        try {
          loading.value = true;
          const resData = await props.data(model, paging);
          const { data = [], total = 0 } = resData?.data || {};
          renderData.value = data;
          props.pagination.total = total;
          props.pagination.current = paging.page;
        } catch (error) {
          const message = config.getApiErrorMessage(error);
          if (message) {
            Message.error(`提示：${message}`);
          }
        } finally {
          loading.value = false;
        }
      }
    };

    watch(
      () => props.data,
      (data) => {
        if (Array.isArray(data)) {
          renderData.value = data;
          props.pagination.total = data.length;
          props.pagination.current = 1;
        }
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      loadData();
    });

    if (props.search) {
      merge(props.search, { formProps: { layout: "inline" } });
    }

    const state = {
      loading,
      inlined,
      searchRef,
      createRef,
      modifyRef,
      renderData,
      loadData,
      reloadData,
      openModifyModal,
    };

    provide("ref:table", { ...state, ...props });

    return state;
  },
  render() {
    (this.columns as any).instance = this;
    return (
      <div class="bh-table w-full">
        {!this.inlined && (
          <div class="pb-5 border-b border-slate-200 mb-5">
            <Form ref="searchRef" class="grid grid-cols-4 gap-x-4" {...this.search}></Form>
          </div>
        )}

        <div class={`mb-2 flex justify-between ${!this.inlined && "mt-2"}`}>
          <div class="flex-1 flex gap-2">
            {this.create && (
              <FormModal ref="createRef" onSubmited={this.reloadData} {...(this.create as any)}></FormModal>
            )}
            {this.modify && (
              <FormModal
                {...(this.modify as any)}
                ref="modifyRef"
                onSubmited={this.reloadData}
                trigger={false}
              ></FormModal>
            )}
            {this.$slots.action?.()}
          </div>
          <div>{this.inlined && <Form ref="searchRef" {...this.search}></Form>}</div>
        </div>

        <BaseTable
          row-key="id"
          bordered={false}
          {...this.tableProps}
          loading={this.loading}
          pagination={this.pagination}
          data={this.renderData}
          columns={this.columns}
          onPageChange={(current: number) => this.loadData({ current })}
        ></BaseTable>
      </div>
    );
  },
});

export type TableInstance = InstanceType<typeof Table>;

export type TableProps = TableInstance["$props"];
