import { AnToastOptions, toast } from '@/components/AnToast';
import { Message } from '@arco-design/web-vue';
import { AxiosInstance } from 'axios';

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
    }
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
    }
  );
}
