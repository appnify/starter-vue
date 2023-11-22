import { sleep } from '@/utils';
import { Message } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash-es';
import { Ref } from 'vue';

export function useModalSubmit(props: any, formRef: any, visible: Ref<boolean>, emit?: any, model?: Ref<Recordable>) {
  const loading = ref(false);
  const origin = cloneDeep(props.model);

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
      emit('submited', res);
      visible.value = false;
      if (model) {
        model.value = cloneDeep(origin);
      }
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
