import { merge } from 'lodash-es';
import { AnFormModal, AnFormModalProps } from '../components/FormModal';
import { useFormProps } from './useForm';
import { FormItem } from './useItems';

export type FormModalUseOptions = Partial<Omit<AnFormModalProps, 'items'>> & {
  /**
   * 弹窗宽度
   * @description 参数 `modalProps.width` 的便捷语法
   * @example
   * ```ts
   * 580
   * ```
   */
  width?: number;
  /**
   * 表单类名
   * @description 参数 `formProps.class` 的便捷语法
   * @example
   * ```ts
   * 'grid grid-cols-2'
   * ```
   */
  formClass?: unknown;
  /**
   * 表单项
   * @example
   * ```tsx
   * [{
   *   field: 'name',
   *   label: '昵称',
   *   setter: 'input'
   * }]
   * ```
   */
  items: FormItem[];
};

export function useFormModalProps(options: FormModalUseOptions): AnFormModalProps {
  if (options.width) {
    merge(options, { modalProps: { width: options.width } });
  }
  if (options.formClass) {
    merge(options, { formProps: { class: options.formClass } });
  }
  const { items, model, formProps } = useFormProps({ ...options, submit: undefined });
  const { trigger, title, submit, modalProps } = options;
  return {
    trigger,
    model,
    items,
    title,
    submit,
    formProps,
    modalProps,
  };
}

export function useFormModal(options: FormModalUseOptions) {
  const modalRef = ref<InstanceType<typeof AnFormModal> | null>(null);
  const formRef = computed(() => modalRef.value?.formRef);
  const open = (data: Recordable = {}) => modalRef.value?.open(data);
  const rawProps = useFormModalProps(options);
  const props = reactive(rawProps);

  const component = () => (
    <AnFormModal
      ref={(el: any) => (modalRef.value = el)}
      title={props.title}
      trigger={props.trigger}
      modalProps={props.modalProps as any}
      model={props.model}
      items={props.items}
      formProps={props.formProps}
      submit={props.submit}
      onUpdate:model={model => ((props as any).model = model)}
    ></AnFormModal>
  );

  return {
    props,
    component,
    modalRef,
    formRef,
    open,
  };
}
