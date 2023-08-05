import { store, useAppStore } from "@/store";
import { NavigationGuardWithThis } from "vue-router";

export const titleGuard: NavigationGuardWithThis<undefined> = function (to, from, next) {
  const appStore = useAppStore(store);
  const title = to.meta.title || appStore.title;
  const subtitle = appStore.subtitle;
  document.title = `${title} | ${subtitle}`;
  next();
};
