import { Api } from "../generated/Api";

/**
 * 扩展生成的API类
 */
export class Service extends Api<unknown> {
  /**
   * 登陆过期处理函数
   * @description 勿动
   */
  expireHandler: () => void = () => {};
}
