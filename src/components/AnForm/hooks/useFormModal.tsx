import { AnFormModal, FormModalProps } from "../components/FormModal";
import { UseForm, useForm } from "./useForm";
import { FormItem } from "./useItems";

type FormModalUseOptions = Partial<Omit<FormModalProps, "items">> & {
  items: FormItem[];
};

export function useFormModal(options: FormModalUseOptions) {
  const { model, items, formProps } = useForm({ ...options, submit: undefined });
  const trigger = ref(options.trigger);
  const title = ref(options.title);
  const modalProps = ref(options.modalProps);
  const modalRef = ref<InstanceType<typeof AnFormModal> | null>(null);
  const formRef = computed(() => modalRef.value?.formRef);

  const component = () => {
    return (
      <AnFormModal
        ref={(el: any) => (modalRef.value = el)}
        title={title.value}
        trigger={trigger.value}
        modalProps={modalProps.value}
        model={model.value}
        items={items.value}
        formProps={formProps.value}
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
  };
}
