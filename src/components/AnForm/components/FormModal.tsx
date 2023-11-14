import { Button, ButtonInstance, Form, FormInstance, Modal } from "@arco-design/web-vue";
import { PropType } from "vue";
import { FormContextKey } from "../core/useFormContext";
import { useFormItems } from "../core/useFormItems";
import { useFormModel } from "../core/useFormModel";
import { useFormRef } from "../core/useFormRef";
import { useFormSubmit } from "../core/useFormSubmit";
import { AnFormItem, IAnFormItem } from "./FormItem";
import { useVModel } from "@vueuse/core";
import { AnForm, IAnFormProps, IAnFormSubmit } from "./Form";

/**
 * 表单组件
 */
export const AnFormModal = defineComponent({
  name: "AnFormModal",
  props: {
    /**
     * 弹窗标题
     * @default '添加'
     */
    title: {
      type: [String, Function] as PropType<ModalType>,
      default: "添加",
    },
    /**
     * 触发元素
     */
    trigger: {
      type: [Boolean, Function, Object] as PropType<ModalTrigger>,
      default: true,
    },
    /**
     * 传递给Modal组件的props
     */
    modalProps: {
      type: Object as PropType<ModalProps>,
    },
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
    const visible = ref(false);
    const formRef = ref<InstanceType<typeof AnForm> | null>(null);

    const modalTitle = () => {
      if (typeof props.title === "string") {
        return props.title;
      }
      return <props.title model={props.model} items={props.items}></props.title>;
    };

    const modalTrigger = () => {
      if (!props.trigger) {
        return null;
      }
      if (typeof props.trigger === "boolean") {
        return <Button onClick={() => (visible.value = true)}>打开</Button>;
      }
      if (typeof props.trigger === "object") {
        return (
          <Button {...props.trigger} onClick={() => (visible.value = true)}>
            打开
          </Button>
        );
      }
      return <props.trigger model={props.model} items={props.items}></props.trigger>;
    };

    return {
      visible,
      formRef,
      modalTitle,
      modalTrigger,
    };
  },
  render() {
    return (
      <>
        <this.modalTrigger></this.modalTrigger>
        <Modal titleAlign="start" closable={false} {...this.$attrs} {...this.modalProps} v-model:visible={this.visible}>
          {{
            title: this.modalTitle,
            default: () => (
              <AnForm
                model={this.model}
                onUpdate:model={(v) => this.$emit("update:model", v)}
                items={this.items}
                submit={this.submit}
                formProps={this.formProps}
              ></AnForm>
            ),
            ...this.$slots,
          }}
        </Modal>
      </>
    );
  },
});

type ModalProps = Omit<InstanceType<typeof Modal>["$props"], "visible" | "title" | "onBeforeOk">;

type ModalType = string | ((model: Recordable, items: IAnFormItem[]) => any);

type ModalTrigger =
  | boolean
  | ((model: Recordable, items: IAnFormItem[]) => any)
  | {
      text?: string;
      buttonProps?: ButtonInstance["$props"];
    };

export type FormModalProps = Pick<
  InstanceType<typeof AnFormModal>["$props"],
  "title" | "trigger" | "modalProps" | "model" | "items" | "submit" | "formProps"
>;
