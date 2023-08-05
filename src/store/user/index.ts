import { LoginedUserVo } from "@/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      /**
       * 用户ID
       */
      id: 0,
      /**
       * 登录用户名
       */
      username: "juetan",
      /**
       * 用户昵称
       */
      nickname: "绝弹",
      /** `   
       * 用户头像地址
       */
      avatar: "https://github.com/juetan.png",
      /**
       * JWT令牌
       */
      accessToken: "",
      /**
       * 刷新令牌
       */
      refreshToken: undefined,
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
     * 清除用户信息
     */
    clearUser() {
      this.$reset()
    },
    /**
     * 设置用户信息
     */
    setUser(user: LoginedUserVo) {
      this.id = user.id;
      this.username = user.username;
      this.nickname = user.nickname;
      this.avatar = user.avatar;
      this.accessToken = user.token;
    },
  },
  persist: true,
});
