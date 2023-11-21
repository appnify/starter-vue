import { Button, Checkbox, Divider, InputNumber, Popover, Scrollbar, Tag } from '@arco-design/web-vue';
import { PropType } from 'vue';
import { AnTablePlugin } from '../hooks/useTablePlugin';
import { AnTableContext } from '../components/Table';

interface Item {
  dataIndex: string;
  enable: boolean;
  autoWidth: boolean;
  width: number;
  editable: boolean;
  title: string;
}

export const TableColumnConfig = defineComponent({
  props: {
    columns: {
      type: Object as PropType<any[]>,
      required: true,
    },
  },
  setup(props) {
    const checkAll = ref(false);
    const visible = ref(false);
    const items = ref<Item[]>([]);
    const checked = computed(() => items.value.filter(i => i.enable));
    const indeterminate = computed(() => {
      const check = checked.value.length;
      const total = items.value.length;
      return 0 < check && check < total;
    });

    watch(
      () => visible.value,
      value => {
        if (value) {
          init();
        } else {
        }
      }
    );

    const init = () => {
      const list: Item[] = [];
      for (const column of props.columns) {
        list.push({
          dataIndex: column.dataIndex,
          title: column.title,
          enable: true,
          autoWidth: !column.width,
          width: column.width ?? 60,
          editable: !column.configable,
        });
      }
      items.value = list;
    };

    const onItemChange = () => {
      if (checked.value.length === 0) {
        checkAll.value = false;
        return;
      }
      if (checked.value.length === items.value.length) {
        checkAll.value = true;
      }
    };

    const onCheckAllChange = (value: any) => {
      for (const item of items.value) {
        if (item.editable) {
          item.enable = value;
        }
      }
    };

    const onReset = () => {
      visible.value = false;
    };

    const onConfirm = () => {
      visible.value = false;
    };

    const onItemUp = (index: number) => {
      [items.value[index - 1], items.value[index]] = [items.value[index], items.value[index - 1]];
    };

    const onItemDown = (index: number) => {
      [items.value[index + 1], items.value[index]] = [items.value[index], items.value[index + 1]];
    };

    return () => (
      <Popover v-model:popup-visible={visible.value} position="br" trigger="click">
        {{
          default: () => (
            <Button class="float-right">{{ icon: () => <span class="icon-park-outline-config"></span> }}</Button>
          ),
          content: () => (
            <>
              <div class="mb-1 leading-none border-b border-gray-100 pb-3">设置表格列</div>
              <Scrollbar outer-class="h-96 overflow-hidden" class="h-full overflow-auto">
                <ul class="grid m-0 p-0 divide-y divide-gray-100 w-[700px] overflow-auto overscroll-contain">
                  {items.value.map((item, index) => (
                    <li
                      key={item.dataIndex}
                      class="group flex items-center justify-between gap-6 py-2 pr-8 select-none"
                    >
                      <div class="flex-1 flex justify-between gap-2">
                        <Checkbox v-model={item.enable} disabled={!item.editable} onChange={onItemChange}>
                          {item.title}
                        </Checkbox>
                        <span class="hidden group-hover:inline-block ml-4">
                          <Button
                            type="text"
                            shape="circle"
                            size="mini"
                            disabled={index == 0}
                            onClick={() => onItemUp(index)}
                          >
                            {{ icon: () => <i class="icon-park-outline-arrow-up"></i> }}
                          </Button>
                          <Button
                            type="text"
                            shape="circle"
                            size="mini"
                            disabled={index == items.value.length - 1}
                            onClick={() => onItemDown(index)}
                          >
                            {{ icon: () => <i class="icon-park-outline-arrow-down"></i> }}
                          </Button>
                        </span>
                      </div>
                      <div class="flex gap-2 items-center">
                        <Checkbox v-model={item.autoWidth} disabled={!item.editable}>
                          {{
                            checkbox: ({ checked }: any) => (
                              <Tag checked={checked} checkable={item.editable} color="blue">
                                自适应
                              </Tag>
                            ),
                          }}
                        </Checkbox>
                        <Divider direction="vertical" margin={8}></Divider>
                        <InputNumber
                          size="small"
                          v-model={item.width}
                          disabled={item.autoWidth || !item.editable}
                          min={60}
                          step={10}
                          class="!w-20"
                        />
                        <span class="text-gray-400">像素</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Scrollbar>
              <div class="mt-4 flex gap-2 items-center justify-between">
                <div class="flex items-center">
                  <Checkbox indeterminate={indeterminate.value} v-model={checkAll.value} onChange={onCheckAllChange}>
                    全选
                  </Checkbox>
                  <span class="text-xs text-gray-400 ml-1">
                    ({checked.value.length}/{items.value.length})
                  </span>
                </div>
                <div class="space-x-2">
                  <Button onClick={onReset}>重置</Button>
                  <Button type="primary" onClick={onConfirm}>
                    确定
                  </Button>
                </div>
              </div>
            </>
          ),
        }}
      </Popover>
    );
  },
});

/**
 * 插件：表格列配置
 * @description 配置ID将缓存结果在本地
 */
export function useColumnConfig(): AnTablePlugin {
  let context: AnTableContext;
  return {
    id: 'columnconfig',
    onSetup(ctx) {
      context = ctx;
    },
    widget() {
      return () => <TableColumnConfig columns={context.props.columns!} />;
    },
  };
}
