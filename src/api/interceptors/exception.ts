import { Notification } from "@arco-design/web-vue";
import { AxiosInstance } from "axios";
import { has, isString } from "lodash-es";

const successCodes = [2000];
const expiredCodes = [4050, 4051];
const resMessageTip = `响应异常，请检查参数或稍后重试!`;
const reqMessageTip = `请求失败，请检查网络或稍后重试!`;

let logoutTipShowing = false;

/**
 * 异常拦截器
 * @param axios Axios实例
 */
export function addExceptionInterceptor(axios: AxiosInstance, exipreHandler?: (...args: any[]) => any) {
  axios.interceptors.request.use(null, (error) => {
    const msg = error.response?.data?.message;
    Notification.error({
      title: "请求提示",
      content: msg ?? `发送请求失败，请检查参数或稍后重试!`,
    });
    return Promise.reject(error);
  });

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
          if (!logoutTipShowing) {
            logoutTipShowing = true;
            Notification.warning({
              title: "登陆提示",
              content: "当前登陆已过期，请重新登陆！",
              onClose: () => (logoutTipShowing = false),
            });
            exipreHandler?.(error);
          }
          return Promise.reject(error);
        }
        const resMsg = error.response?.data?.message;
        let message: string | null = resMsg ?? resMessageTip;
        if (has(error.config, "resErrorTip")) {
          const tip = error.config.resErrorTip;
          if (tip) {
            message = isString(tip) ? tip : message;
          } else {
            message = null;
          }
        }
        if (message) {
          Notification.error({
            title: "请求提示",
            content: message,
          });
        }
        return Promise.reject(error);
      }

      // 客户端请求错误
      if (error.request) {
        const resMsg = error.response?.message;
        let message: string | null = resMsg ?? reqMessageTip;
        if (has(error.config, "reqErrorTip")) {
          const tip = error.config.reqErrorTip;
          if (tip) {
            message = isString(tip) ? tip : message;
          } else {
            message = null;
          }
        }
        if (message) {
          Notification.error({
            title: "请求提示",
            content: message,
          });
        }
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
}
