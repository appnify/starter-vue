import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    const user = useStorage("APP_USER", {
      /**
       * 用户名称
       */
      name: "绝弹",
      /**
       * 用户头像地址
       */
      avatar: "https://github.com/juetan.png",
      /**
       * JWT令牌
       */
      accessToken: "",
    });
    return user;
  },
  actions: {
    setToken(token: string) {
      this.accessToken = token;
    },
    clearUser() {
      this.name = "";
      this.avatar = "";
      this.accessToken = "";
    },
    setUser(user: { name: string; avatar: string; accessToken: string }) {
      this.name = user.name;
      this.avatar = user.avatar;
      this.accessToken = user.accessToken;
    },
  },
});
