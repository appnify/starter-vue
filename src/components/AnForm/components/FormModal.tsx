import { useVisible } from '@/hooks/useVisible';
import { Button, ButtonInstance, FormInstance, Modal } from '@arco-design/web-vue';
import { InjectionKey, PropType, Ref } from 'vue';
import { useModalSubmit } from './useModalSubmit';
import { useModalTrigger } from './useModalTrigger';
import { AnForm, AnFormInstance, AnFormProps, AnFormSubmit } from './Form';
import { AnFormItemProps } from './FormItem';

export interface AnFormModalContext {
  visible: Ref<boolean>;
  loading: Ref<boolean>;
  formRef: Ref<AnFormInstance | null>;
  open: (data: Recordable) => void;
  close: () => void;
  submitForm: () => any | Promise<any>;
  modalTitle: () => any;
  modalTrigger: () => any;
  onClose: () => void;
}

export const AnFormModalContextKey = Symbol('AnFormModalContextKey') as InjectionKey<AnFormModalContext>;

/**
 * 表单组件
 */
export const AnFormModal = defineComponent({
  name: 'AnFormModal',
  props: {
    /**
     * 弹窗标题
     * @default
     * ```ts
     * '新增'
     * ```
     */
    title: {
      type: [String, Function] as PropType<AnFormModalTitle>,
      default: '新增',
    },
    /**
     * 触发元素
     * @default
     * ```ts
     * '新增'
     * ```
     */
    trigger: {
      type: [Boolean, String, Function, Object] as PropType<AnFormModalTrigger>,
      default: true,
    },
    /**
     * 传递给Modal的props
     * @example
     * ```ts
     * {
     *   closable: true
     * }
     * ```
     */
    modalProps: {
      type: Object as PropType<Omit<InstanceType<typeof Modal>['$props'], 'visible' | 'title'>>,
    },
    /**
     * 表单数据
     * @example
     * ```ts
     * {
     *   id: undefined
     * }
     * ```
     */
    model: {
      type: Object as PropType<Recordable>,
      required: true,
    },
    /**
     * 表单项
     * @example
     * ```ts
     * [{
     *   field: 'name',
     *   label: '昵称',
     *   setter: 'input'
     * }]
     * ```
     */
    items: {
      type: Array as PropType<AnFormItemProps[]>,
      default: () => [],
    },
    /**
     * 提交表单
     * @example
     * ```ts
     * (model) => api.user.addUser(model)
     * ```
     */
    submit: {
      type: [String, Function] as PropType<AnFormSubmit>,
    },
    /**
     * 传给Form组件的参数
     * @example
     * ```ts
     * {
     *   layout: 'vertical'
     * }
     * ```
     */
    formProps: {
      type: Object as PropType<Omit<FormInstance['$props'], 'model' | 'ref'>>,
    },
  },
  emits: ['update:model'],
  setup(props) {
    const formRef = ref<AnFormInstance | null>(null);
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
      if (typeof props.title === 'string') {
        return props.title;
      }
      return <props.title model={props.model} items={props.items}></props.title>;
    };

    const context: AnFormModalContext = {
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

    return context;
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
                onUpdate:model={v => this.$emit('update:model', v)}
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

export type AnFormModalTitle = string | ((model: Recordable, items: AnFormItemProps[]) => any);

export type AnFormModalTrigger =
  | boolean
  | string
  | ((model: Recordable, items: AnFormItemProps[]) => any)
  | {
      text?: string;
      buttonProps?: ButtonInstance['$props'];
      buttonSlots?: Recordable;
    };

export type AnFormModalInstance = InstanceType<typeof AnFormModal>;

export type AnFormModalProps = Pick<
  AnFormModalInstance['$props'],
  'title' | 'trigger' | 'modalProps' | 'model' | 'items' | 'submit' | 'formProps'
>;
