import "axios";
import { IToastOptions } from "@/components";

declare module "axios" {
  interface AxiosRequestConfig {
    /**
     * toast config
     * @default false
     */
    toast?: boolean | string | IToastOptions;
    /**
     * close toast(internal)
     * @private
     */
    _closeToast?: () => void;
  }
}
