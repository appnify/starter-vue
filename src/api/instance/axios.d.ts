import { IToastOptions } from "@/components";
import "axios";

declare module "axios" {
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
    closeToast?: () => void;
    /**
     * 响应异常提示
     */
    resErrorTip?: boolean | string;
    /**
     * 请求异常提示
     */
    reqErrorTip?: boolean | string;
  }
}
