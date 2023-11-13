import { Form as BaseForm, FormInstance as BaseFormInstance } from "@arco-design/web-vue";
import { PropType } from "vue";
import { FormContextKey } from "../core/interface";
import { useFormItems } from "../core/useFormItems";
import { useFormModel } from "../core/useFormModel";
import { useFormRef } from "../core/useFormRef";
import { useFormSubmit } from "../core/useFormSubmit";
import { AnFormItem, IAnFormItem } from "./FormItem";
import { SubmitFn } from "./types/Form";

/**
 * 表单组件
 */
export const AnForm = defineComponent({
  name: "AnForm",
  props: {
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Recordable>,
      required: true,
    },
    /**
     * 表单项
     */
    items: {
      type: Array as PropType<IAnFormItem[]>,
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
  setup(props, { slots }) {
    const model = computed(() => props.model);
    const items = computed(() => props.items);
    const submit = computed(() => props.submit);
    const formRefes = useFormRef();
    const formModel = useFormModel(model);
    const formItems = useFormItems(items, model);
    const formSubmit = useFormSubmit({ items, model, validate: formRefes.validate, submit });

    const context = {
      slots,
      ...formModel,
      ...formItems,
      ...formRefes,
      ...formSubmit,
    };

    provide(FormContextKey, context);
    return context;
  },
  render() {
    return (
      <BaseForm layout="vertical" {...this.$attrs} {...this.formProps} ref="formRef" model={this.model}>
        {this.items.map((item) => (
          <AnFormItem item={item} items={this.items} model={this.model}></AnFormItem>
        ))}
      </BaseForm>
    );
  },
});

export type AnFormInstance = InstanceType<typeof AnForm>;

export type AnFormProps = AnFormInstance["$props"];

export type IAnForm = Pick<AnFormProps, "model" | "items" | "submit" | "formProps">;
