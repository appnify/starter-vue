import { AnFormModal, FormModalProps } from '../components/FormModal';
import { useFormProps } from './useForm';
import { FormItem } from './useItems';

export type FormModalUseOptions = Partial<Omit<FormModalProps, 'items'>> & {
  items: FormItem[];
};

export function useFormModalProps(options: FormModalUseOptions) {
  const form = useFormProps({ ...options, submit: undefined });
  const props = reactive({
    ...form,
    title: options.title,
    trigger: options.trigger,
    modalProps: options.modalProps,
    submit: options.submit,
  });
  return props;
}

export function useFormModal(options: FormModalUseOptions) {
  const modalRef = ref<InstanceType<typeof AnFormModal> | null>(null);
  const formRef = computed(() => modalRef.value?.formRef);
  const open = (data: Recordable = {}) => modalRef.value?.open(data);
  const props = useFormModalProps(options);

  const component = () => {
    return (
      <AnFormModal
        ref={(el: any) => (modalRef.value = el)}
        title={props.title}
        trigger={props.title}
        modalProps={props.modalProps as any}
        model={props.model}
        items={props.items}
        formProps={props.formProps}
        submit={props.submit}
      ></AnFormModal>
    );
  };

  return {
    props,
    component,
    modalRef,
    formRef,
    open,
  };
}
