import { Modal, ModalConfig } from "@arco-design/web-vue";
import { merge } from "lodash-es";

export const modal = {
  delConfirm(config: Partial<Omit<ModalConfig, "onOk" | "onCancel">> = {}) {
    return new Promise<void>((resolve, reject) => {
      const mergedConfig = merge(
        {
          title: "提示",
          titleAlign: "start",
          width: 432,
          content: "确定删除该数据吗？注意：该操作不可恢复！",
          maskClosable: false,
          closable: false,
          okText: "确定删除",
          okButtonProps: {
            status: "danger",
          },
          onOk: () => {
            resolve();
          },
          onCancel: () => {
            reject();
          },
        },
        config
      );
      Modal.open(mergedConfig);
    });
  },
};
