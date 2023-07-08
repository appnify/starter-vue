import { Button, ButtonInstance, FormInstance, Message, Modal } from "@arco-design/web-vue";
import { assign, cloneDeep, omit } from "lodash-es";
import { PropType, defineComponent } from "vue";
import { Form } from "./form";
import { IFormItem } from "./form-item";

/**
 * 表单弹窗组件
 */
export const FormModal = defineComponent({
  name: "FormModal",
  inheritAttrs: false,
  props: {
    /**
     * 弹窗标题
     * @default '新建'
     */
    title: {
      type: [String, Function] as PropType<
        string | ((args: { model: Record<string, any>; items: IFormItem[] }) => string)
      >,
      default: "新建",
    },
    /**
     * 触发元素
     */
    trigger: {
      type: [Boolean, Object] as PropType<boolean | (ButtonInstance["$props"] & { text: string })>,
      default: true,
    },
    /**
     * 传递给Modal组件的props
     */
    modalProps: {
      type: Object as PropType<Omit<InstanceType<typeof Modal>["$props"], "visible" | "title" | "onBeforeOk">>,
    },
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    /**
     * 表单各项
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      required: true,
    },
    /**
     * 提交表单的函数
     * @description 可返回`{ message }`类型，用于显示提示信息
     */
    submit: {
      type: Function as PropType<(arg: { model: Record<string, any>; items: IFormItem[] }) => any | Promise<any>>,
      default: () => true,
    },
    /**
     * 传递给Form组件的props
     */
    formProps: {
      type: Object as PropType<Omit<FormInstance["$props"], "model">>,
    },
  },
  emits: ["close", "submited"],
  setup(props, { slots, emit, attrs }) {
    const origin = cloneDeep(props.model);
    const formRef = ref<InstanceType<typeof Form>>();
    const loading = ref(false);
    const visible = ref(false);

    const open = async (data: Record<string, any> = {}) => {
      visible.value = true;
      await nextTick();
      for (const key in data) {
        props.model[key] = data[key];
      }
    };

    const onBeforeOk = async () => {
      if (typeof attrs.onBeforeOk === "function") {
        const isOk = await attrs.onBeforeOk();
        if (!isOk) return false;
      }
      const errors = await formRef.value?.formRef?.validate();
      if (errors) {
        return false;
      }
      try {
        const model = formRef.value?.getModel() || {};
        const res = await props.submit?.({ items: props.items, model });
        res?.message && Message.success(`提示: ${res.message}`);
        emit("submited", res);
      } catch (error: any) {
        error.message && Message.error(`提示: ${error.message}`);
        return false;
      }
      return true;
    };

    const onClose = () => {
      visible.value = false;
      assign(props.model, origin);
      emit("close");
    };

    const modalTitle = computed(() => {
      if (typeof props.title === "string") {
        return props.title;
      }
      if (typeof props.title === "function") {
        return props.title({ model: props.model, items: props.items });
      }
    });

    const modalTrigger = computed(() => {
      if (!props.trigger) {
        return null;
      }
      let content;
      if (typeof props.trigger === "boolean") {
        content = (
          <Button type="primary">
            {{
              default: () => "新建",
              icon: () => <i class="icon-park-outline-plus" />,
            }}
          </Button>
        );
      }
      if (typeof props.trigger === "object") {
        content = (
          <Button type="primary" {...omit(props.trigger, "text")}>
            {props.trigger?.text || "新建"}
          </Button>
        );
      }
      if (slots.trigger) {
        content = slots.trigger({ model: props.model, items: props.items });
      }
      return <span onClick={() => open()}>{content}</span>;
    });

    return {
      origin,
      formRef,
      loading,
      visible,
      modalTitle,
      modalTrigger,
      open,
      onClose,
      onBeforeOk,
    };
  },
  render() {
    return (
      <>
        {this.modalTrigger}
        <Modal
          {...this.modalProps}
          v-model:visible={this.visible}
          onBeforeOk={this.onBeforeOk}
          onClose={this.onClose}
          title={this.modalTitle}
        >
          {this.visible && (
            <Form ref={(el: any) => (this.formRef = el)} {...this.formProps} model={this.model} items={this.items}>
              {{ ...this.$slots }}
            </Form>
          )}
        </Modal>
      </>
    );
  },
});

export type FormModalInstance = InstanceType<typeof FormModal>;

export type FormModalProps = FormModalInstance["$props"];

export default FormModal;
