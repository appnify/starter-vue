import { Form as BaseForm, FormInstance as BaseFormInstance, Message } from "@arco-design/web-vue";
import { assign, cloneDeep, defaultsDeep } from "lodash-es";
import { PropType } from "vue";
import { FormItem, IFormItem } from "./form-item";
import { NodeType, nodeMap } from "./form-node";
import { config } from "./form-config";

type SubmitFn = (arg: { model: Record<string, any>; items: IFormItem[] }) => Promise<any>;

/**
 * 表单组件
 */
export const Form = defineComponent({
  name: "Form",
  props: {
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Record<any, any>>,
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

    props.items.forEach((item: any) => {
      const node = nodeMap[item.type as NodeType];
      defaultsDeep(item, { nodeProps: node?.nodeProps ?? {} });
      (node as any)?.init?.({ item, model: props.model });
    });

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
      assign(props.model, model);
    };

    const submitForm = async () => {
      if (await formRef.value?.validate()) {
        return;
      }
      const model: Record<string, any> = getModel();
      try {
        loading.value = true;
        const res = await props.submit?.({ model, items: props.items });
        if (res?.message) {
          Message.success(`提示: ${res.message}`);
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "提交失败";
        if (message) {
          Message.error(`提示: ${message}`);
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      formRef,
      loading,
      getItem,
      submitForm,
      resetModel,
      setModel,
      getModel,
    };
  },
  render() {
    (this.items as any).instance = this;

    const props = {
      items: this.items,
      model: this.model,
      slots: this.$slots,
    };

    return (
      <BaseForm ref="formRef" layout="vertical" model={this.model} {...this.$attrs} {...this.formProps}>
        {this.items.map((item) => (
          <FormItem loading={this.loading} onSubmit={this.submitForm} item={item} {...props}></FormItem>
        ))}
      </BaseForm>
    );
  },
});

export type FormInstance = InstanceType<typeof Form>;

export type FormProps = FormInstance["$props"];

export type FormDefinedProps = Pick<FormProps, "model" | "items" | "submit" | "formProps">;
