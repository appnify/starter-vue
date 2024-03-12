import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => {
    return {
      id: 0,
      username: 'juetan',
      nickname: '绝弹',
      avatar: 'https://github.com/juetan.png',
      accessToken: '',
      refreshToken: undefined,
      auth: [],
    };
  },
  actions: {
    /**
     * 设置令牌
     */
    setToken(token: string) {
      this.accessToken = token;
    },

    /**
     * 设置访问令牌
     * @param token 令牌
     */
    setAccessToken(token?: string) {
      this.accessToken = token;
    },

    /**
     * 清除用户信息
     */
    clearUser() {
      this.$reset();
    },

    /**
     * 设置用户信息
     */
    setUser(user: Partial<UserStore>) {
      const { id, username, nickname, avatar, accessToken } = user;
      id && (this.id = id);
      username && (this.username = username);
      nickname && (this.nickname = nickname);
      avatar && (this.avatar = avatar);
      accessToken && (this.accessToken = accessToken);
    },
  },
  persist: {
    key: '__APP_USER__',
    paths: ['accessToken'],
  },
});

export interface UserStore {
  /**
   * 用户ID
   */
  id: number;
  /**
   * 登录用户名
   */
  username: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 头像地址
   */
  avatar?: string;
  /**
   * 访问令牌
   */
  accessToken?: string;
  /**
   * 刷新令牌
   */
  refreshToken?: string;
  /**
   * 拥有权限
   */
  auth: string[];
}
