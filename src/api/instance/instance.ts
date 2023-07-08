import { Api } from "../service";
import { toast, IToastOptions } from "@/components";
import { useUserStore, store } from "@/store";

const userStore = useUserStore(store);

/**
 * 自定义扩展, 例如添加额外的请求函数
 */
class Service extends Api<unknown> {
  github = {
    /**
     * 获取当前仓库信息
     */
    getRepoInfo: async () => {
      const info: Record<string, any> = await this.request({
        baseURL: "https://api.github.com",
        path: "/repos/juetan/apptify-admin",
        method: "GET",
      });
      return info;
    },
  };
}

/**
 * api实例
 * @see src/api/instance/instance.ts
 */
const api = new Service({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
        options = {
          message: config.toast,
        };
      }
      if (typeof config.toast === "object") {
        options = config.toast;
      }
      config._closeToast = toast(options);
    }
    return config;
  },
  (error) => {
    error.config?._closeToast?.();
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
api.instance.interceptors.response.use(
  (res) => {
    res.config?._closeToast?.();
    if (res.data?.code && res.data.code !== 2000) {
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    error.config?._closeToast?.();
    if (error.request) {
      console.log("request error", error.request);
    }
    if (error.response) {
      console.log("response error", error.response);
    }
    return Promise.reject(error);
  }
);

export { api };
