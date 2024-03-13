import { store } from '@/store';
import { useUserStore } from '@/store/user';
import { Message, Notification } from '@arco-design/web-vue';
import { AxiosInstance } from 'axios';

const codes = [4050, 4051];
let showing = false;

/**
 * 登陆令牌拦截器
 * @param axios Axios实例
 */
export function addAuthInterceptor(axios: AxiosInstance) {
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
