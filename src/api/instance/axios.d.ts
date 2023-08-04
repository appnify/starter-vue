import "axios";
import { IToastOptions } from "@/components";

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
  }
}
