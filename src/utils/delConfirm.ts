import { Modal, ModalConfig } from '@arco-design/web-vue';
import { merge } from 'lodash-es';

export type DelOptions = string | Partial<Omit<ModalConfig, 'onOk' | 'onCancel'>>;

export const delOptions: ModalConfig = {
  maskAnimationName: '',
  modalAnimationName: '',
  title: '提示',
  titleAlign: 'start',
  width: 432,
  content: '危险操作，确定删除该数据吗？',
  maskClosable: false,
  closable: false,
  okText: '确定删除',
  okButtonProps: {
    status: 'danger',
  },
};

export const delConfirm = (config: DelOptions = {}) => {
  if (typeof config === 'string') {
    config = { content: config };
  }
  const merged = merge({ content: '' }, delOptions, config);
  return new Promise<void>((onOk: () => void, onCancel) => {
    Modal.open({ ...merged, onOk, onCancel });
  });
};
