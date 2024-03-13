import { api } from '@/api';
import { router } from '@/router';
import { store } from '@/store';
import { useUserStore } from '@/store/user';

export const logout = {
  install() {
    api.instance.onLogout = () => {
      const userStore = useUserStore(store);
      const redirect = router.currentRoute.value.path;
      userStore.clearUser();
      router.push({ path: '/login', query: { redirect } });
    };
  },
};
