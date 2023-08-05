import { NProgress } from "@/plugins";
import { NavigationGuardWithThis, NavigationHookAfter } from "vue-router";

const before: NavigationGuardWithThis<undefined> = function (to, from, next) {
  NProgress.start();
  next();
};

const after: NavigationHookAfter = function () {
  NProgress.done();
};

export const nprogressGuard = {
  before,
  after,
};
