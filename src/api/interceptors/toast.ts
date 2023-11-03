import { IToastOptions, toast } from "@/components";
import { AxiosInstance } from "axios";

/**
 * 提示拦截器
 * @param axios Axios实例
 */
export function addToastInterceptor(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config) => {
      if (config.toast) {
        let options: IToastOptions = {};
        if (typeof config.toast === "string") {
          options = { message: config.toast };
        }
        if (typeof config.toast === "object") {
          options = config.toast;
        }
        config.closeToast = toast(options);
      }
      return config;
    },
    (error) => {
      error.config.closeToast?.();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      response.config.closeToast?.();
      return response;
    },
    (error) => {
      error.config.closeToast?.();
      return Promise.reject(error);
    }
  );
}
