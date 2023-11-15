import { AnFormModal, FormModalProps } from "../components/FormModal";
import { useForm } from "./useForm";
import { FormItem } from "./useItems";

export type FormModalUseOptions = Partial<Omit<FormModalProps, "items">> & {
  items: FormItem[];
};

export function useFormModal(options: FormModalUseOptions) {
  const { model, items, formProps } = useForm({ ...options, submit: undefined });
  const trigger = ref(options.trigger);
  const title = ref(options.title);
  const modalProps = ref(options.modalProps);
  const modalRef = ref<InstanceType<typeof AnFormModal> | null>(null);
  const submit = ref(options.submit);
  const formRef = computed(() => modalRef.value?.formRef);
  const open = (data: Recordable = {}) => modalRef.value?.open(data);

  const component = () => {
    return (
      <AnFormModal
        ref={(el: any) => (modalRef.value = el)}
        title={title.value}
        trigger={trigger.value}
        modalProps={modalProps.value as any}
        model={model.value}
        items={items.value}
        formProps={formProps.value}
        submit={submit.value}
      ></AnFormModal>
    );
  };

  return {
    model,
    items,
    formProps,
    component,
    modalRef,
    formRef,
    open,
  };
}
