import { Form, FormInstance } from "@arco-design/web-vue";
import { PropType } from "vue";
import { FormContextKey } from "../core/useFormContext";
import { useFormItems } from "../core/useFormItems";
import { useFormModel } from "../core/useFormModel";
import { useFormRef } from "../core/useFormRef";
import { useFormSubmit } from "../core/useFormSubmit";
import { AnFormItem, IAnFormItem } from "./FormItem";
import { useVModel } from "@vueuse/core";

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
      type: Function as PropType<IAnFormSubmit>,
    },
    /**
     * 传给Form组件的参数
     */
    formProps: {
      type: Object as IAnFormProps,
    },
  },
  emits: ["update:model"],
  setup(props, { slots, emit }) {
    const model = useVModel(props, "model", emit);
    const items = computed(() => props.items);
    const submit = computed(() => props.submit);
    const formRefes = useFormRef();
    const formModel = useFormModel(model, formRefes.clearValidate);
    const formItems = useFormItems(items, model);
    const formSubmit = useFormSubmit({ items, model, validate: formRefes.validate, submit }, formModel.getModel);
    const context = { slots, ...formModel, ...formItems, ...formRefes, ...formSubmit };

    provide(FormContextKey, context);
    return context;
  },
  render() {
    return (
      <Form layout="vertical" {...this.$attrs} {...this.formProps} ref="formRef" model={this.model}>
        {this.items.map((item) => (
          <AnFormItem key={item.field} item={item} items={this.items} model={this.model}></AnFormItem>
        ))}
      </Form>
    );
  },
});

export type AnFormInstance = InstanceType<typeof AnForm>;

export type AnFormProps = AnFormInstance["$props"];

export type IAnFormProps = PropType<Omit<FormInstance["$props"], "model">>;

export type IAnForm = Pick<AnFormProps, "model" | "items" | "submit" | "formProps">;

export type IAnFormSubmit = (model: Recordable, items: IAnFormItem) => any;
