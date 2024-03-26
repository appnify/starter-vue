import { IToastOptions } from '@/components';
import { App } from 'vue';
import 'axios';

declare module 'axios' {
  interface AxiosInstance {
    /**
     * 登陆过期时的处理
     */
    onLogout?: () => void;
  }

  interface AxiosStatic {
    /**
     * 作为 Vue 插件
     */
    install(app: App): void;
  }

  interface AxiosRequestConfig {
    /**
     * 请求弹窗配置
     * @default false
     */
    toast?: boolean | string | IToastOptions;
    /**
     * 关闭弹窗
     * @private
     */
    _toast?: { open: () => void, close: () => void }
    /**
     * 是否在请求成功后提示
     * @default false
     */
    msg?: boolean | string;
    /**
     * 响应异常提示
     */
    resErrorTip?: boolean | string;
    /**
     * 请求异常提示
     */
    reqErrorTip?: boolean | string;
    /**
     * TODO
     */
    tip?: boolean | string | { requestErrorTip?: string; responseErrorTip?: string };
  }
}
