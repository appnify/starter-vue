import { createRouter, createWebHashHistory } from "vue-router";
import { useAuth, useNprogress, useTitle } from "../guards";
import { routes } from "../routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    ...routes,
  ],
});

useNprogress(router);
useTitle(router);
useAuth(router);

export { router };
