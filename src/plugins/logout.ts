import { axios } from '@/plugins/axios';
import { router } from '@/router';
import { store } from '@/store';
import { useUserStore } from '@/store/user';

export const logout = {
  install() {
    axios.onLogout = () => {
      const userStore = useUserStore(store);
      const redirect = router.currentRoute.value.path;
      userStore.clearUser();
      router.push({ path: '/login', query: { redirect } });
    };
  },
};
