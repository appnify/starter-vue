import { AnForm, IAnForm, IAnFormProps } from "@/components/AnForm";
import { AnFormModal } from "@/components/AnForm/components/FormModal";
import AniEmpty from "@/components/empty/AniEmpty.vue";
import { FormModalProps } from "@/components/form";
import {
  TableColumnData as BaseColumn,
  TableData as BaseData,
  Table as BaseTable,
  PaginationProps,
} from "@arco-design/web-vue";
import { isObject, merge } from "lodash-es";
import { PropType, computed, defineComponent, ref } from "vue";

type DataFn = (search: Record<string, any>, paging: { page: number; size: number }) => Promise<any>;

/**
 * 表格组件
 * @see src/components/table/table.tsx
 */
export const AnTable = defineComponent({
  name: "AnTable",
  props: {
    /**
     * 表格数据
     * @description 可以是数组或者函数
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
      type: Object as PropType<boolean | PaginationProps>,
    },
    /**
     * 搜索表单配置
     */
    search: {
      type: Object as PropType<IAnForm>,
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
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<InstanceType<typeof BaseTable>["$props"]>,
    },
  },
  setup(props) {
    const loading = ref(false);
    const tableRef = ref<InstanceType<typeof BaseTable>>();
    const searchRef = ref<FormInstance>();
    const createRef = ref<FormModalInstance>();
    const modifyRef = ref<FormModalInstance>();
    const renderData = ref<BaseData[]>([]);
    const inlined = computed(() => (props.search?.items?.length ?? 0) <= config.searchInlineCount);
    const reloadData = () => loadData({ current: 1, pageSize: 10 });
    const openModifyModal = (data: any) => modifyRef.value?.open(data);

    const useTablePaging = () => {
      const getPaging = () => {
        if (isObject(props.pagination)) {
          return {
            page: props.pagination.current,
            size: props.pagination.pageSize,
          };
        }
        return {};
      };

      const setPaging = (paging: PaginationProps) => {
        if (isObject(props.pagination)) {
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
      const model = searchRef.value?.getModel() ?? {};

      // 本地加载
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
        setPaging({ total: renderData.value.length, current: 1 });
      }

      // 远程加载
      if (typeof props.data === "function") {
        try {
          loading.value = true;
          const resData = await props.data(model, paging);
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

    if (props.search) {
      merge(props.search, { formProps: { layout: "inline" } });
    }

    const state = {
      loading,
      inlined,
      tableRef,
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
      <div class="table w-full">
        {!this.inlined && this.search && (
          <div class="border-b pb-0 border-slate-200 mb-3">
            <AnForm
              ref="searchRef"
              class="!grid grid-cols-4 gap-x-6"
              v-model:model={this.search.model}
              items={this.search.items}
              submit={this.search.submit}
              formProps={this.search.formProps}
            ></AnForm>
          </div>
        )}

        <div class={`mb-3 flex toolbar justify-between ${!this.inlined && "mt-2"}`}>
          <div class={`${this.create || this.$slots.action ? null : "!hidden"} flex-1 flex gap-2 `}>
            {this.create && (
              <AnFormModal
                ref="createRef"
                {...this.create}
                v-model:model={this.create.model}
                onSubmited={this.reloadData}
              ></AnFormModal>
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
          ref="tableRef"
          row-key="id"
          bordered={false}
          {...this.$attrs}
          {...this.tableProps}
          loading={this.loading}
          pagination={this.pagination}
          data={this.renderData}
          columns={this.columns}
          onPageChange={(current: number) => this.loadData({ current })}
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
export type TableInstance = InstanceType<typeof Table>;

/**
 * 表格组件参数
 */
export type TableProps = TableInstance["$props"];
