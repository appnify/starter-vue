import { AnFormModal, AnFormModalProps } from '../components/FormModal';
import { useFormProps } from './useForm';
import { FormItem } from './useItems';

export type FormModalUseOptions = Partial<Omit<AnFormModalProps, 'items'>> & {
  items: FormItem[];
};

export function useFormModalProps(options: FormModalUseOptions): AnFormModalProps {
  const { items, model, formProps } = useFormProps({ ...options, submit: undefined });
  const { trigger, title, submit, modalProps } = options;
  return {
    model,
    items,
    formProps,
    trigger,
    title,
    modalProps,
    submit,
  };
}

export function useFormModal(options: FormModalUseOptions) {
  const modalRef = ref<InstanceType<typeof AnFormModal> | null>(null);
  const formRef = computed(() => modalRef.value?.formRef);
  const open = (data: Recordable = {}) => modalRef.value?.open(data);
  const rawProps = useFormModalProps(options);
  const props = reactive(rawProps);

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
