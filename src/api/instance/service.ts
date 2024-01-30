import { App } from 'vue';
import { Api } from '../generated/Api';

/**
 * 扩展生成的API类
 */
export class Service extends Api<unknown> {
  /**
   * 登陆过期处理函数
   * @description 勿动
   */
  expireHandler: () => void = () => {};

  /**
   * 作为VUE插件进行初始化
   * @param app
   */
  install(app: App) {
    app.config.globalProperties.$api = this;
  }
}
