import { store, useAppStore } from "@/store";
import { NavigationHookAfter } from "vue-router";

export const titleGuard: NavigationHookAfter = function (to) {
  const appStore = useAppStore(store);
  const title = to.meta.title || appStore.title;
  const subtitle = appStore.subtitle;
  document.title = `${title} | ${subtitle}`;
};
