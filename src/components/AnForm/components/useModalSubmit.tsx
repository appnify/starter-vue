import { sleep } from '@/utils';
import { Message } from '@arco-design/web-vue';
import { Ref } from 'vue';

export function useModalSubmit(props: any, formRef: any, visible: Ref<boolean>) {
  const loading = ref(false);

  const submitForm = async () => {
    if (await formRef.value?.validate()) {
      return;
    }
    try {
      loading.value = true;
      const data = formRef.value?.getModel() ?? {};
      const res = await props.submit?.(data, props.items);
      const msg = res?.data?.message;
      msg && Message.success(msg);
      visible.value = false;
    } catch {
      // todo
    } finally {
      loading.value = false;
    }
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  return {
    loading,
    setLoading,
    submitForm,
  };
}
