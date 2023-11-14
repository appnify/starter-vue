import { FormInstance, Message } from "@arco-design/web-vue";
import { Ref } from "vue";
import { IAnFormItem } from "../components/FormItem";

interface Options {
  items: Ref<IAnFormItem[]>;
  model: Ref<Recordable>;
  submit: Ref<Function | undefined>;
  validate: FormInstance["validate"];
}

export function useFormSubmit(options: Options, getModel: any) {
  const { items, submit, validate } = options;
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
      const data = getModel();
      const res = await submit.value?.(data, items.value);
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
