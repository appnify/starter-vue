import {
  Button,
  Cascader,
  CheckboxGroup,
  DatePicker,
  Input,
  InputNumber,
  InputPassword,
  RadioGroup,
  RangePicker,
  Select,
  Slider,
  Textarea,
  TimePicker,
} from "@arco-design/web-vue";

const initOptions = ({ item, model }: any) => {
  if (Array.isArray(item.options)) {
    item.nodeProps.options = item.options;
    return;
  }
  if (typeof item.options !== "function") {
    return;
  }
  item.nodeProps.options = reactive([]);
  const fetchData = item.options;
  item._updateOptions = async () => {
    let data = await fetchData({ item, model });
    if (Array.isArray(data?.data)) {
      data = data.data.map((i: any) => ({ label: i.name, value: i.id }));
    }
    if (Array.isArray(data)) {
      item.nodeProps.options.splice(0);
      item.nodeProps.options.push(...data);
    }
  };
  item._updateOptions();
};

const defineNodeMap = <T extends { [key: string]: { component: any, nodeProps: any } }>(map: T) => {
  return map
}

/**
 * 表单项组件映射
 */
export const nodeMap = {
  /**
   * 输入框
   */
  input: {
    component: Input,
    nodeProps: {
      placeholder: "请输入",
      allowClear: true,
    } as InstanceType<typeof Input>["$props"],
  },
  /**
   * 文本域
   */
  textarea: {
    component: Textarea,
    nodeProps: {
      placeholder: "请输入",
      allowClear: true,
    } as InstanceType<typeof Textarea>["$props"],
  },
  /**
   * 数值输入框
   */
  number: {
    component: InputNumber,
    nodeProps: {
      placeholder: "请输入",
      defaultValue: 0,
      allowClear: true,
    } as InstanceType<typeof InputNumber>["$props"],
  },
  /**
   * 密码输入框
   */
  password: {
    component: InputPassword,
    nodeProps: {
      placeholder: "请输入",
    } as InstanceType<typeof InputPassword>["$props"],
  },
  /**
   * 选择框
   */
  select: {
    component: Select,
    nodeProps: {
      placeholder: "请选择",
      allowClear: true,
      allowSearch: true,
      options: [{}],
    } as InstanceType<typeof Select>["$props"],
    init: initOptions,
  },
  /**
   * 级联选择框
   */
  cascader: {
    component: Cascader,
    nodeProps: {
      placeholder: "请选择",
      allowClear: true,
      expandTrigger: "hover",
    } as InstanceType<typeof Cascader>["$props"],
    init: initOptions,
  },
  /**
   * 时间选择框
   */
  time: {
    component: TimePicker,
    nodeProps: {
      allowClear: true,
    } as InstanceType<typeof TimePicker>["$props"],
  },
  /**
   * 日期选择框
   */
  date: {
    component: DatePicker,
    nodeProps: {
      allowClear: true,
    } as InstanceType<typeof DatePicker>["$props"],
  },
  /**
   * 日期范围选择框
   */
  dateRange: {
    component: RangePicker,
    nodeProps: {
      allowClear: true,
    } as InstanceType<typeof RangePicker>["$props"],
  },
  /**
   * 复选框
   */
  checkbox: {
    component: CheckboxGroup,
    nodeProps: {
      allowClear: true,
    } as InstanceType<typeof CheckboxGroup>["$props"],
    init: initOptions,
  },
  /**
   * 复选框
   */
  radio: {
    component: RadioGroup,
    nodeProps: {
      allowClear: true,
    } as InstanceType<typeof RadioGroup>["$props"],
    init: initOptions,
  },
  /**
   * 滑动输入条
   */
  slider: {
    component: Slider,
    nodeProps: {
      allowClear: true,
    } as InstanceType<typeof Slider>["$props"],
  },
  /**
   * 底部
   */
  submit: {
    component: (props: any, { emit }: any) => {
      const state = inject("tableInstance");
      console.log("st", state);
      return (
        <>
          <Button type="primary" loading={props.loading} onClick={() => emit("submit")} class="mr-3">
            立即提交
          </Button>
          {/* <Button loading={props.loading} onClick={() => emit("cancel")}>
          重置
        </Button> */}
        </>
      );
    },
    nodeProps: {},
  },
  /**
   * 自定义组件
   */
  custom: {
    nodeProps: {},
    component: () => null,
  },
};

/**
 * 所有组件类型
 */
export type NodeMap = typeof nodeMap;

/**
 * 组件类型
 */
export type NodeType = keyof NodeMap;

/**
 * 提供给`FormItem`的联合类型
 * @description 当输入type，nodeProps会提供对应类型提示
 */
export type NodeUnion = {
  [key in NodeType]: {
    /**
     * 输入框类型，默认为`input`
     */
    type: key;
    /**
     * 传递给`type`属性对应组件的参数
     */
    nodeProps?: NodeMap[key]["nodeProps"];
  };
}[NodeType];
