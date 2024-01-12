import { store } from '@/store';
import { useUserStore } from '@/store/user';
import { AxiosInstance } from 'axios';

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
    // throw Error('dd');
    return config;
  });
}
