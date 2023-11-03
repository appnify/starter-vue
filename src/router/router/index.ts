import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "../guards/guard-auth";
import { progressGuard } from "../guards/guard-progress";
import { titleGuard } from "../guards/guard-title";
import { routes } from "../routes";
import { api } from "@/api";
import { store, useUserStore } from "@/store";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home/home",
    },
    ...routes,
  ],
});

router.beforeEach(progressGuard.before);
router.afterEach(progressGuard.after);
router.beforeEach(authGuard);
router.afterEach(titleGuard);

api.expireHandler = () => {
  const userStore = useUserStore(store);
  userStore.clearUser();
  const redirect = router.currentRoute.value.path;
  router.push({ path: "/login", query: { redirect } });
};
