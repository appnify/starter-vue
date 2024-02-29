import { FormModalUseOptions, useFormModalProps } from '@/components/AnForm';

export type UseCreateFormOptions = FormModalUseOptions & {};

export function useCreateForm(options: UseCreateFormOptions) {
  if (options.width) {
    if (!options.modalProps) {
      (options as any).modalProps = {};
    }
    (options.modalProps as any).width = options.width;
    delete options.width;
  }
  if (options.formClass) {
    if (!options.formProps) {
      (options as any).formProps = {};
    }
    options.formProps!.class = options.formClass;
    delete options.formClass;
  }
  return useFormModalProps(options);
}
