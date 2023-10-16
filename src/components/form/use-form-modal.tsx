import { Modal } from "@arco-design/web-vue";
import { merge } from "lodash-es";
import { Component, Ref, reactive } from "vue";
import { useForm } from "./use-form";
import FormModal, { FormModalInstance, FormModalProps } from "./form-modal";

const defaults: Partial<InstanceType<typeof Modal>> = {
  width: 1080,
  titleAlign: "start",
  closable: false,
  maskClosable: false,
};

/**
 * 构建传给FormModal组件的参数
 * @see src/components/form/use-form-modal.tsx
 */
export const useFormModal = (options: Partial<FormModalProps>): FormModalProps => {
  const { model = {}, items = [] } = options || {};
  const form = useForm({ model, items });

  return reactive(
    merge(
      {
        modalProps: { ...defaults },
        formProps: {
          layout: "vertical",
        },
      },
      {
        ...options,
        ...form,
      }
    )
  );
};

interface Context {
  props: any;
  modalRef: Ref<FormModalInstance | null>;
  open: (args?: Record<string, any>) => Promise<void> | undefined;
}

export const useAniFormModal = (options: Partial<FormModalProps>): [Component, Context] => {
  const props = useFormModal(options);
  const modalRef = ref<FormModalInstance | null>(null);
  const onModalRef = (el: any) => (modalRef.value = el);
  const component = defineComponent({
    name: "AniFormModalWrapper",
    render() {
      return <FormModal {...this.$attrs} {...props} ref={onModalRef} />;
    },
  });
  const component1 = (p: any) => <FormModal {...p} {...props} ref={onModalRef} />;
  const context = {
    props,
    modalRef,
    open: (args?: Record<string, any>) => modalRef.value?.open(args),
  };
  return [component1, context];
};
