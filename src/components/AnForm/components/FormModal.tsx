import { Button, ButtonInstance, FormInstance, Message, Modal } from '@arco-design/web-vue';
import { useVModel } from '@vueuse/core';
import { InjectionKey, PropType, Ref } from 'vue';
import { getModel, setModel } from '../utils/useFormModel';
import { AnForm, AnFormInstance, AnFormSubmit } from './Form';
import { AnFormItemProps } from './FormItem';
import { cloneDeep } from 'lodash-es';

export interface AnFormModalContext {
  visible: Ref<boolean>;
  loading: Ref<boolean>;
  anFormRef: Ref<AnFormInstance | null>;
  submitForm: () => any | Promise<any>;
  open: (data: Recordable) => void;
  close: () => void;
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
      type: [Object, Function] as PropType<AnFormSubmit>,
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
  emits: ['update:model', 'submited'],
  setup(props, { emit }) {
    const model = useVModel(props, 'model', emit);
    const originModel = cloneDeep(model.value);
    const anFormRef = ref<AnFormInstance | null>(null);
    const visible = ref(false);
    const loading = ref(false);

    const modalTitle = () => {
      if (typeof props.title === 'string') {
        return props.title;
      }
      return <props.title model={props.model} items={props.items}></props.title>;
    };

    const modalTrigger = () => {
      if (!props.trigger) {
        return null;
      }
      if (typeof props.trigger === 'function') {
        return <props.trigger model={props.model} items={props.items} open={open}></props.trigger>;
      }
      const internal = {
        text: '新增',
        buttonProps: {},
        buttonSlots: {},
      };
      if (typeof props.trigger === 'string') {
        internal.text = props.trigger;
      }
      if (typeof props.trigger === 'object') {
        Object.assign(internal, props.trigger);
      }
      return (
        <Button type="primary" {...internal.buttonProps} onClick={open}>
          {{
            ...internal.buttonSlots,
            icon: () => <i class="icon-park-outline-add"></i>,
            default: () => internal.text,
          }}
        </Button>
      );
    };

    const submitForm = async () => {
      if (await anFormRef.value?.validate()) {
        return;
      }
      try {
        loading.value = true;
        const data = getModel(model.value);
        const res = await (props as any).submit?.(data, props.items);
        const msg = res?.data?.message;
        msg && Message.success(msg);
        visible.value = false;
        emit('submited', res);
      } catch {
        // todo
      } finally {
        loading.value = false;
      }
    };

    const open = async (data: Recordable = {}) => {
      visible.value = true;
      await nextTick();
      model.value = cloneDeep(originModel)
      setModel(model.value, data);
    };

    const close = () => {
      loading.value = false;
      visible.value = false;
    };

    const onClose = () => {};

    const context: AnFormModalContext = {
      visible,
      loading,
      anFormRef,
      open,
      close,
      onClose,
      submitForm,
      modalTitle,
      modalTrigger,
    };

    provide(AnFormModalContextKey, context);

    return {
      ...context
    };
  },
  render() {
    return (
      <>
        <this.modalTrigger></this.modalTrigger>
        <Modal
          titleAlign="start"
          closable={false}
          maskAnimationName=""
          modalAnimationName=""
          {...this.modalProps}
          v-model:visible={this.visible}
          class="an-form-modal"
          maskClosable={false}
          unmountOnClose={true}
          onClose={this.onClose}
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
