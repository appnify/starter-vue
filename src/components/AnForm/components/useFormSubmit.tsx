import { Message } from '@arco-design/web-vue';
import { IAnForm } from './Form';
import { IAnFormItem } from './FormItem';
import { cloneDeep } from 'lodash-es';

const SUBMIT_ITEM = {
  field: 'id',
  setter: 'submit' as const,
  itemProps: {
    hideLabel: true,
  },
};

export function useFormSubmit(props: IAnForm, validate: any, getModel: any) {
  const loading = ref(false);
  const submitItem = ref<IAnFormItem | null>(null);

  if (props.submit) {
    submitItem.value = cloneDeep(SUBMIT_ITEM);
  }

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
    const submit = typeof props.submit === 'string' ? () => null : props.submit;
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
    submitItem,
    setLoading,
    submitForm,
    cancelForm,
  };
}

export type FormSubmit = ReturnType<typeof useFormSubmit>;
