import { Button } from "@arco-design/web-vue";
import { FormContextKey } from "../core/useFormContext";
import { defineSetter } from "./util";

export default defineSetter<{ a1?: number }, "10">({
  setter() {
    const { loading, submitForm, resetModel } = inject(FormContextKey)!;
    return (
      <>
        <Button type="primary" loading={loading.value} onClick={submitForm} class="mr-3">
          提交
        </Button>
        <Button disabled={loading.value} onClick={resetModel}>
          重置
        </Button>
      </>
    );
  },
  setterProps: {},
});
