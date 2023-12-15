import { Button } from '@arco-design/web-vue';
import { FormContextKey } from '../components/Form';
import { defineSetter } from './util';

export default defineSetter<{}, 'none'>({
  setter() {
    const { submitForm, resetForm } = inject(FormContextKey)!;
    return (
      <>
        <Button type="primary" onClick={submitForm} class="mr-3">
          提交
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </>
    );
  },
  setterProps: {},
});
