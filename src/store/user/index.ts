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
       * 用户名称
       */
      username: "绝弹",
      /**
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
      refreshToken: "",
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
      this.username = "";
      this.avatar = "";
      this.accessToken = "";
    },
    /**
     * 设置用户信息
     */
    setUser(user: LoginedUserVo) {
      this.username = user.username;
      this.avatar = user.avatar;
      this.accessToken = user.token;
    },
  },
  persist: true,
});
