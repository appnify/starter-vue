import { Button, ButtonInstance, Modal } from "@arco-design/web-vue";
import { PropType } from "vue";
import { IAnFormItem } from "./FormItem";
import { AnForm, IAnFormProps, IAnFormSubmit } from "./Form";
import { useModalTrigger } from "../core/useModalTrigger";
import { useModalSubmit } from "../core/useModalSubmit";
import { useVisible } from "@/hooks/useVisible";

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
     * @default '新增'
     */
    trigger: {
      type: [Boolean, String, Function, Object] as PropType<ModalTrigger>,
      default: true,
    },
    /**
     * 传递给Modal的props
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
      type: [String, Function] as PropType<IAnFormSubmit>,
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
    const formRef = ref<InstanceType<typeof AnForm> | null>(null);
    const { visible, show, hide } = useVisible();
    const { modalTrigger } = useModalTrigger(props, show);
    const { loading, setLoading, submitForm } = useModalSubmit(props, formRef, visible);

    const open = (data: Recordable = {}) => {
      formRef.value?.setModel(data);
      visible.value = true;
    };

    const close = () => {
      setLoading(false);
      hide();
    };

    const onClose = () => {};

    const modalTitle = () => {
      if (typeof props.title === "string") {
        return props.title;
      }
      return <props.title model={props.model} items={props.items}></props.title>;
    };

    return {
      visible,
      loading,
      formRef,
      open,
      close,
      submitForm,
      modalTitle,
      modalTrigger,
      onClose,
    };
  },
  render() {
    return (
      <>
        <this.modalTrigger></this.modalTrigger>
        <Modal
          titleAlign="start"
          closable={false}
          {...this.$attrs}
          {...this.modalProps}
          maskClosable={false}
          onClose={this.onClose}
          v-model:visible={this.visible}
        >
          {{
            title: this.modalTitle,
            default: () => (
              <AnForm
                ref="formRef"
                model={this.model}
                onUpdate:model={(v) => this.$emit("update:model", v)}
                items={this.items}
                formProps={this.formProps}
              ></AnForm>
            ),
            footer: () => (
              <div class="flex items-center justify-between gap-4">
                <div></div>
                <div class="space-x-2">
                  <Button onClick={() => (this.visible = false)}>取消</Button>
                  <Button type="primary" loading={this.loading} onClick={this.submitForm}>
                    确定
                  </Button>
                </div>
              </div>
            ),
          }}
        </Modal>
      </>
    );
  },
});

type ModalProps = Partial<Omit<InstanceType<typeof Modal>["$props"], "visible" | "title" | "onBeforeOk">>;

type ModalType = string | ((model: Recordable, items: IAnFormItem[]) => any);

type ModalTrigger =
  | boolean
  | string
  | ((model: Recordable, items: IAnFormItem[]) => any)
  | {
      text?: string;
      buttonProps?: ButtonInstance["$props"];
      buttonSlots?: Recordable;
    };

export type FormModalProps = Pick<
  InstanceType<typeof AnFormModal>["$props"],
  "title" | "trigger" | "modalProps" | "model" | "items" | "submit" | "formProps"
>;
