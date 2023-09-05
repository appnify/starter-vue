import { NProgress } from "@/libs/nprogress";
import { NavigationGuardWithThis, NavigationHookAfter } from "vue-router";

const before: NavigationGuardWithThis<undefined> = function () {
  NProgress.start();
};

const after: NavigationHookAfter = function () {
  NProgress.done();
};

export const nprogressGuard = {
  before,
  after,
};
