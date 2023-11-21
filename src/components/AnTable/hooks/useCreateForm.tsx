import { FormModalUseOptions, useFormModalProps } from '@/components/AnForm';

export type UseCreateFormOptions = FormModalUseOptions & {
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
};

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
