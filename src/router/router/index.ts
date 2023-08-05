import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "../guards/guard-auth";
import { nprogressGuard } from "../guards/guard-nprogress";
import { titleGuard } from "../guards/guard-title";
import { routes } from "../routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    ...routes,
  ],
});

router.beforeEach(nprogressGuard.before);
router.afterEach(nprogressGuard.after);
router.beforeEach(titleGuard);
router.beforeEach(authGuard);
