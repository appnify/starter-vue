import { Button } from "@arco-design/web-vue";

export default {
  render: (props: any, { emit }: any) => {
    return (
      <>
        <Button type="primary" loading={props.loading} onClick={() => emit("submit")} class="mr-3">
          立即提交
        </Button>
        {/* <Button loading={props.loading} onClick={() => emit("cancel")}>
        重置
      </Button> */}
      </>
    );
  },
  nodeProps: {},
};
