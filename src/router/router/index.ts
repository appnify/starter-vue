import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "../routes";
import { useAuthGuard } from "../guards/guard-auth";
import { useNprogressGuard } from "../guards/guard-nprogress";
import { useTitleGuard } from "../guards/guard-title";

const nprogressGuard = useNprogressGuard();
const titleGuard = useTitleGuard();
const authGuard = useAuthGuard();

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

router.beforeEach(nprogressGuard.before);
router.beforeEach(nprogressGuard.after);
router.beforeEach(titleGuard);
router.beforeEach(authGuard);

export { router };
