import { Form as BaseForm, FormInstance as BaseFormInstance, Message } from "@arco-design/web-vue";
import { assign, cloneDeep, defaultsDeep, merge } from "lodash-es";
import { PropType } from "vue";
import { FormItem, IFormItem } from "./form-item";
import { nodeMap } from "./form-node";
import { config } from "./form-config";

type SubmitFn = (arg: { model: Record<string, any>; items: IFormItem[] }) => Promise<any>;

/**
 * 表单组件
 */
export const Form = defineComponent({
  name: "AppnifyForm",
  props: {
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Recordable>,
      default: () => reactive({}),
    },
    /**
     * 表单项
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    /**
     * 提交表单
     */
    submit: {
      type: Function as PropType<SubmitFn>,
    },
    /**
     * 传给Form组件的参数
     */
    formProps: {
      type: Object as PropType<Omit<BaseFormInstance["$props"], "model">>,
    },
  },
  setup(props) {
    const model = cloneDeep(props.model);
    const formRef = ref<InstanceType<typeof BaseForm>>();
    const loading = ref(false);

    for (const item of props.items) {
      const node = nodeMap[item.type] as any;
      defaultsDeep(item, { nodeProps: node?.nodeProps ?? {} });
      (node as any)?.init?.({ item, model: props.model });
    }

    const getItem = (field: string) => {
      return props.items.find((item) => item.field === field);
    };

    const getModel = () => {
      return config.getModel(props.model);
    };

    const setModel = (data: Record<string, any>) => {
      config.setModel(props.model, data);
    };

    const resetModel = () => {
      assign(props.model, merge({}, model));
    };

    const submitForm = async () => {
      if (await formRef.value?.validate()) {
        return;
      }
      const model: Record<string, any> = getModel();
      try {
        loading.value = true;
        const res = await props.submit?.({ model, items: props.items });
        res?.message && Message.success(`提示: ${res.message}`);
      } catch (error: any) {
        const message = error?.response?.data?.message || error?.message;
        message && Message.error(`提示: ${message}`);
      } finally {
        loading.value = false;
      }
    };

    const injected = {
      formRef,
      loading,
      getItem,
      submitForm,
      resetModel,
      setModel,
      getModel,
    };

    provide("form1", injected);

    return injected;
  },
  render() {
    (this.items as any).instance = this;

    const props = {
      items: this.items,
      model: this.model,
      slots: this.$slots,
    };

    return (
      <BaseForm layout="vertical" {...this.$attrs} {...this.formProps} ref="formRef" model={this.model}>
        {this.items.map((item) => (
          <FormItem item={item} {...props}></FormItem>
        ))}
      </BaseForm>
    );
  },
});

export type FormInstance = InstanceType<typeof Form>;

export type FormProps = FormInstance["$props"];

export type FormDefinedProps = Pick<FormProps, "model" | "items" | "submit" | "formProps">;
