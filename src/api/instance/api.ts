import { Service } from "./service";
import { addToastInterceptor } from "../interceptors/toast";
import { addAuthInterceptor } from "../interceptors/auth";
import { addExceptionInterceptor } from "../interceptors/exception";

/**
 * API 接口实例
 * @see src/api/instance/instance.ts
 */
const api = new Service({
  baseURL: import.meta.env.VITE_API,
});

/**
 * 添加请求提示拦截器
 */
addToastInterceptor(api.instance);

/**
 * 添加登陆令牌拦截器
 */
addAuthInterceptor(api.instance);

/**
 * 添加异常处理拦截器
 */
addExceptionInterceptor(api.instance, () => api.expireHandler?.());

export { api };
