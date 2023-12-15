import { FormInstance } from "@arco-design/web-vue";

export function useFormRef() {
  /**
   * 原始表单实例
   */
  const formRef = ref<FormInstance | null>(null);

  type Validate      = FormInstance["validate"];
  type ValidateField = FormInstance["validateField"];
  type ResetFields   = FormInstance["resetFields"];
  type ClearValidate = FormInstance["clearValidate"];
  type SetFields     = FormInstance["setFields"];
  type ScrollToField = FormInstance["scrollToField"];

  const validate: Validate           = async (...args) => formRef.value?.validate(...args);
  const validateField: ValidateField = async (...args) => formRef.value?.validateField(...args);
  const resetFields: ResetFields     = (...args) => formRef.value?.resetFields(...args);
  const clearValidate: ClearValidate = (...args) => formRef.value?.clearValidate(...args);
  const setFields: SetFields         = (...args) => formRef.value?.setFields(...args);
  const scrollToField: ScrollToField = (...args) => formRef.value?.scrollToField(...args);

  return {
    formRef,
    validate,
    validateField,
    resetFields,
    clearValidate,
    setFields,
    scrollToField,
  };
}

export type FormRef = ReturnType<typeof useFormRef>;
