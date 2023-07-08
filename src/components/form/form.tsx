import { Form as BaseForm, FormInstance as BaseFormInstance, Message } from "@arco-design/web-vue";
import { assign, cloneDeep, defaultsDeep } from "lodash-es";
import { PropType } from "vue";
import { FormItem, IFormItem } from "./form-item";
import { NodeType, nodeMap } from "./form-node";

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
      type: Object as PropType<Record<string, any>>,
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
      type: Function as PropType<(arg: { model: Record<string, any>; items: IFormItem[] }) => Promise<any>>,
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
      (node as any).init?.({ item, model: props.model });
    });

    const getItem = (field: string) => {
      return props.items.find((item) => item.field === field);
    };

    const getModel = () => {
      const model: Record<string, any> = {};
      for (const key of Object.keys(props.model)) {
        if (/[^:]+:[^:]+/.test(key)) {
          const keys = key.split(":");
          const vals = cloneDeep(props.model[key] || []);
          for (const k of keys) {
            model[k] = vals.shift();
          }
        } else {
          model[key] = cloneDeep(props.model[key]);
        }
      }
      return model;
    };

    const submitForm = async () => {
      if (await formRef.value?.validate()) {
        return;
      }
      const model: Record<string, any> = getModel();
      try {
        loading.value = true;
        const res = await props.submit?.({ model, items: props.items });
        res.message && Message.success(`提示: ${res.message}`);
      } finally {
        loading.value = false;
      }
    };

    const resetModel = () => {
      assign(props.model, model);
    };

    const setModel = (model: Record<string, any>) => {
      for (const key of Object.keys(props.model)) {
        if (/.+:.+/.test(key)) {
          const [key1, key2] = key.split(":");
          props.model[key] = [model[key1], model[key2]];
        } else {
          props.model[key] = model[key];
        }
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
