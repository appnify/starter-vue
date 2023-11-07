import { NProgress } from "@/libs/nprogress";
import { useAppStore } from "@/store";
import { Router } from "vue-router";

const routeMap = new Map<string, boolean>();

export function useProgressGard(router: Router) {
  router.beforeEach(function (to) {
    NProgress.start();
    if (routeMap.get(to.fullPath)) {
      return true;
    }
    const appStore = useAppStore();
    appStore.setPageLoading(true);
  });

  router.afterEach(function (to) {
    NProgress.done();
    if (routeMap.get(to.fullPath)) {
      return;
    }
    const appStore = useAppStore();
    setTimeout(() => {
      appStore.setPageLoading(false);
      routeMap.set(to.fullPath, true);
    }, 500);
  });

  return router;
}
