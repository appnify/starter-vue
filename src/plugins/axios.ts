import { App } from 'vue';
import { AxiosInstance } from 'axios';
import { client } from '@/api/http-client';
import { useUserStore } from '@/store/user';
import { store } from '@/store';
import { Message } from '@arco-design/web-vue';
import { has } from 'lodash-es';
import { toast } from '@/components/AnToast';

/**
 * 登陆令牌拦截器
 * @param axios Axios实例
 */
export function addAuthInterceptor(axios: AxiosInstance) {
  const codes = [4050, 4051];
  let showing = false;

  axios.interceptors.request.use(config => {
    const userStore = useUserStore(store);
    if (userStore.accessToken) {
      config.headers.Authorization = `Bearer ${userStore.accessToken}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      const code = error.response.data?.code;
      if (!error.response) {
        return Promise.reject(error);
      }
      if (codes.includes(code) && !showing) {
        showing = true;
        Message.warning({
          content: '登陆已过期，请重新登陆！',
          onClose: () => (showing = false),
        });
        axios.onLogout?.();
      }
      return Promise.reject(error);
    },
  );
}

/**
 * 异常拦截器
 * @param axios Axios实例
 */
export function addExceptionInterceptor(axios: AxiosInstance) {
  const successCodes = [2000];
  const resMessageTip = `响应异常，请检查参数或稍后重试!`;
  const resGetMessage = `数据获取失败，请检查网络或稍后重试!`;
  const reqMessageTip = `请求失败，请检查网络或稍后重试!`;

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
            message = typeof tip === 'string' ? tip : message;
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

/**
 * 提示拦截器
 * @param axios Axios实例
 */
export function addToastInterceptor(axios: AxiosInstance) {
  axios.interceptors.request.use(
    config => {
      if (config.toast) {
        config.closeToast = toast(config.toast);
      }
      return config;
    },
    error => {
      error.config?.closeToast?.();
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    response => {
      const { closeToast, msg } = response.config;
      closeToast?.();
      if (msg) {
        Message.success(`提示: ${typeof msg === 'string' ? msg : response.data?.message}`);
      }
      return response;
    },
    error => {
      error.config?.closeToast?.();
      return Promise.reject(error);
    },
  );
}

/**
 * 添加请求提示拦截器
 */
addToastInterceptor(client.instance);

/**
 * 添加异常处理拦截器
 */
addExceptionInterceptor(client.instance);

/**
 * 添加登陆令牌拦截器
 */
addAuthInterceptor(client.instance);

/**
 * 作为 Vue 插件，挂载到 Vue 实例上
 */
(client as any).install = (app: App) => {
  // app.config.globalProperties.$axios = client.instance;
};

export const axios = client;
