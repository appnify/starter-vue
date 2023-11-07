import { useMenuStore } from "@/store/menu";
import { RouteRecordRaw } from "vue-router";

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: (to) => {
      const { home } = useMenuStore();
      return {
        name: home,
      };
    },
  },
];
