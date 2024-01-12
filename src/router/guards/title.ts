import { store } from '@/store';
import { useAppStore } from '@/store/app';
import { Router } from 'vue-router';

export function useTitleGuard(router: Router) {
  router.beforeEach(function (to) {
    const appStore = useAppStore(store);
    const title = to.meta.title || appStore.title;
    const subtitle = appStore.subtitle;
    document.title = `${title} | ${subtitle}`;
  });
  return router;
}
