import { Api } from "../service/Api";
import { toast, IToastOptions } from "@/components";
import { useUserStore, store } from "@/store";

const userStore = useUserStore(store);

/**
 * API 接口实例
 * @see src/api/instance/instance.ts
 */
export const api = new Api({
  baseURL: import.meta.env.VITE_API_PREFIX,
});

/**
 * 请求拦截器
 */
api.instance.interceptors.request.use(
  (config) => {
    if (userStore.accessToken) {
      config.headers.Authorization = `Bearer ${userStore.accessToken}`;
    }
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
    error.config?.closeToast?.();
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
api.instance.interceptors.response.use(
  (res) => {
    res.config.closeToast?.();
    if (res.data?.code && res.data.code !== 2000) {
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    error.config.closeToast?.();
    if (error.request) {
      console.log("request error", error.request);
    }
    if (error.response) {
      console.log("response error", error.response);
    }
    return Promise.reject(error);
  }
);
