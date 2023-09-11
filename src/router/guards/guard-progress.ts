import { NProgress } from "@/libs/nprogress";
import { useAppStore } from "@/store";
import { NavigationGuardWithThis, NavigationHookAfter } from "vue-router";

const routeMap = new Map<string, boolean>();

const before: NavigationGuardWithThis<undefined> = function (to) {
  NProgress.start();
  if (routeMap.get(to.fullPath)) {
    return true;
  }
  const appStore = useAppStore();
  appStore.setPageLoading(true);
};

const after: NavigationHookAfter = function (to) {
  NProgress.done();
  if (routeMap.get(to.fullPath)) {
    return;
  }
  const appStore = useAppStore();
  setTimeout(() => {
    appStore.setPageLoading(false);
    routeMap.set(to.fullPath, true);
  }, 200);
};

export const progressGuard = {
  before,
  after,
};
