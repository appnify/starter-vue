import { addToastInterceptor } from './interceptorToast';
import { addAuthInterceptor } from './interceptorAuth';
import { addExceptionInterceptor } from './interceptorException';
import { env } from '@/config/env';
import { App } from 'vue';
import { Api } from './generated/Api';

/**
 * 扩展生成的API类
 */
export class Service extends Api<unknown> {
  /**
   * 作为VUE插件进行初始化
   * @param app
   */
  install(app: App) {
    app.config.globalProperties.$api = this;
  }

  /**
   * 登陆过期处理函数
   * @description 勿动
   */
  expireHandler = () => {};
}

/**
 * API 接口实例
 * @see src/api/instance/instance.ts
 */
export const api = new Service({
  timeout: 2000,
  baseURL: env.apiPrefix,
});

/**
 * 添加请求提示拦截器
 */
addToastInterceptor(api.instance);

/**
 * 添加异常处理拦截器
 */
addExceptionInterceptor(api.instance);

/**
 * 添加登陆令牌拦截器
 */
addAuthInterceptor(api.instance);
