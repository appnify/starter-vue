import { Modal, ModalConfig } from "@arco-design/web-vue";
import { merge } from "lodash-es";

type DelOptions = string | Partial<Omit<ModalConfig, "onOk" | "onCancel">>;

const delOptions = {
  title: "提示",
  titleAlign: "start",
  width: 432,
  content: "危险操作，确定删除该数据吗？",
  maskClosable: false,
  closable: false,
  okText: "确定",
  okButtonProps: {
    status: "danger",
  },
};

const delConfirm = (config: DelOptions = {}) => {
  if (typeof config === "string") {
    config = { content: config };
  }
  const merged = merge(delOptions, config);
  return new Promise<void>((onOk: () => void, onCancel) => {
    Modal.open({ ...merged, onOk, onCancel });
  });
};

export { delConfirm };

