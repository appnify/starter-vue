import { Message } from '@arco-design/web-vue';
import { AxiosInstance } from 'axios';
import { has, isString } from 'lodash-es';

const successCodes = [2000];
const resMessageTip = `响应异常，请检查参数或稍后重试!`;
const resGetMessage = `数据获取失败，请检查网络或稍后重试!`;
const reqMessageTip = `请求失败，请检查网络或稍后重试!`;

/**
 * 异常拦截器
 * @param axios Axios实例
 */
export function addExceptionInterceptor(axios: AxiosInstance) {
  /**
   * 虽说是请求异常拦截，但也仅仅是处理中间件异常的问题
   * 一旦发起请求就属于响应异常了(包括网络问题)。
   */
  axios.interceptors.request.use(null, error => {
    const msg = error.response?.data?.message;
    Message.error(msg ?? `发送请求失败，请检查参数或稍后重试!`);
    return Promise.reject(error);
  });

  /**
   * 处理响应异常，包括
   */
  axios.interceptors.response.use(
    /**
     * 处理自定义状态码异常
     */
    res => {
      const code = res.data?.code;
      if (code && !successCodes.includes(code)) {
        return Promise.reject(res);
      }
      return res;
    },
    error => {
      /**
       * 有结果返回
       */
      if (error.response) {
        let message: string | null = resMessageTip;
        if (error.config?.method === 'get') {
          message = resGetMessage;
        }
        const resMsg = error.response?.data?.message;
        if (resMsg) {
          message = resMsg;
        }
        if (has(error.config, 'resErrorTip')) {
          const tip = error.config.resErrorTip;
          if (tip) {
            message = isString(tip) ? tip : message;
          } else {
            message = null;
          }
        }
        message &&
          Message.error({
            icon: () => h('i', { class: 'icon-park-outline-earth text-red-500' }),
            content: message,
          });
        return Promise.reject(error);
      }

      if (error.request) {
        const message = error.response?.message ?? reqMessageTip;
        message &&
          Message.error({
            icon: () => h('i', { class: 'icon-park-outline-earth text-red-500' }),
            content: message,
          });
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
}
