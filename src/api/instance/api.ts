import { IToastOptions, toast } from "@/components";
import { store, useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";
import { Api } from "../service/Api";

class Service extends Api<unknown> {
  /**
   * 登陆过期处理函数
   */
  tokenExpiredHandler: () => void = () => {};
  /**
   * 设置登陆过期后的处理函数
   * @param handler
   */
  setTokenExpiredHandler(handler: () => void) {
    this.tokenExpiredHandler = handler;
  }
}

/**
 * API 接口实例
 * @see src/api/instance/instance.ts
 */
const api = new Service({
  baseURL: import.meta.env.VITE_API,
});

/**
 * 请求拦截器
 */
api.instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(store);
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
    const userStore = useUserStore(store);
    if (error.response) {
      const code = error.response.data?.code;
      if (code === 4050 || code === 4051) {
        userStore.clearUser();
        api.tokenExpiredHandler?.();
      }
    } else if (error.request) {
      console.log("request error", error.request);
      Message.error(`提示：网络异常，请检查网络是否正常或稍后重试!`);
    }
    return Promise.reject(error);
  }
);

export { api };
