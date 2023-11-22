import { createVNode, render } from 'vue';
import AnToast from './AnToast.vue';

export interface AnToastOptions {
  /**
   * 展示内容
   * @default
   * ```ts
   * '正在操作中，请稍等...'
   * ```
   */
  message?: string;
  /**
   * 图标
   * @default
   * ```ts
   * 'icon-park-outline-loading-one'
   * ```
   */
  icon?: string;
  /**
   * 是否显示遮罩层
   * @default
   * ```ts
   * true
   * ```
   */
  mask?: boolean;
  /**
   * 是否覆盖窗口(即不允许其他操作)
   * @default
   * ```ts
   * true
   * ```
   */
  cover?: boolean;
}

export const toast = (messageOrOptions?: string | AnToastOptions) => {
  if (typeof messageOrOptions === 'string') {
    messageOrOptions = { message: messageOrOptions };
  }
  const container = document.createElement('div');
  const vnode = createVNode(AnToast, messageOrOptions as any);
  render(vnode, container);
  document.body.appendChild(container);
  const close = () => {
    render(null, container);
    document.body.removeChild(container);
  };
  return close;
};
