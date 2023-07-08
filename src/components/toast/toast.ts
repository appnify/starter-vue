import { createVNode, render } from "vue";
import Toast from "./toast.vue";

export interface IToastOptions {
  /**
   * 展示内容
   * @default '正在操作中，请稍等...'
   */
  message?: string;
  /**
   * 图标
   * @default 'icon-park-outline-loading-one'
   */
  icon?: string;
  /**
   * 是否显示遮罩层
   * @default true
   */
  mask?: boolean;
  /**
   * 是否覆盖窗口(即不允许其他操作)
   * @default false
   */
  cover?: boolean;
}

export const toast = (messageOrOptions?: string | IToastOptions) => {
  if (typeof messageOrOptions === "string") {
    messageOrOptions = {
      message: messageOrOptions,
    };
  }
  const container = document.createElement("div");
  const vnode = createVNode(Toast, messageOrOptions as any);
  render(vnode, container);
  document.body.appendChild(container);
  const close = () => {
    render(null, container);
    document.body.removeChild(container);
  };
  return close;
};
