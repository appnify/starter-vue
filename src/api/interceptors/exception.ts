import { Notification } from "@arco-design/web-vue";
import { AxiosInstance } from "axios";

const successCodes = [2000];
const expiredCodes = [4050, 4051];
let tipShowing = false;

/**
 * 异常拦截器
 * @param axios Axios实例
 */
export function addExceptionInterceptor(axios: AxiosInstance, exipreHandler?: (...args: any[]) => any) {
  axios.interceptors.response.use(
    (res) => {
      const code = res.data?.code;
      if (code && !successCodes.includes(code)) {
        return Promise.reject(res);
      }
      return res;
    },
    (error) => {
      // 服务端响应错误
      if (error.response) {
        const code = error.response.data?.code;
        if (expiredCodes.includes(code)) {
          Notification.warning({
            title: "登陆提示",
            content: "当前登陆已过期，请重新登陆！",
          });
          exipreHandler?.(error);
        }
        return Promise.reject(error);
      }

      // 客户端请求错误
      if (error.request) {
        if (!tipShowing) {
          tipShowing = true;
          Notification.error({
            title: "请求提示",
            content: `请求服务器失败，请检查网络或稍后重试!`,
            onClose: () => (tipShowing = false),
          });
        }
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
}
