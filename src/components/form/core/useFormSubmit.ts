import { Ref } from "vue";
import { FormItem } from "../hooks/types/FormItem";
import { FormInstance, Message } from "@arco-design/web-vue";

interface Options {
  items: Ref<FormItem[]>;
  model: Ref<Recordable>;
  submit: Ref<Function | undefined>;
  validate: FormInstance["validate"];
}

export function useFormSubmit(options: Options) {
  const { model, items, submit, validate } = options;
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
    try {
      loading.value = true;
      const res = await submit.value?.(model.value, items.value);
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
