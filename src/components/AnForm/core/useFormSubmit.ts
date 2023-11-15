import { Message } from "@arco-design/web-vue";
import { IAnForm } from "../components/Form";

export function useFormSubmit(props: IAnForm, validate: any, getModel: any) {
  const loading = ref(false);

  /**
   * 设置loading
   * @param value 值
   */
  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  /**
   * 提交表单
   */
  const submitForm = async () => {
    if (await validate()) {
      return;
    }
    const submit = typeof props.submit === "string" ? () => null : props.submit;
    try {
      loading.value = true;
      const data = getModel();
      const res = await submit?.(data, props.items ?? []);
      const msg = res?.data?.message;
      msg && Message.success(`提示: ${msg}`);
    } catch {
      console.log();
    } finally {
      loading.value = false;
    }
  };

  /**
   * 取消提交
   */
  const cancelForm = () => {};

  return {
    loading,
    setLoading,
    submitForm,
    cancelForm,
  };
}

export type FormSubmit = ReturnType<typeof useFormSubmit>;
