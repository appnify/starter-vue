<script lang="tsx">
import { MenuItem } from '@/router';
import { useMenuStore } from '@/store/menu';

export default defineComponent({
  name: 'LayoutMenu',
  setup() {
    const selectedKeys = ref<string[]>([]);
    const route = useRoute();
    const router = useRouter();
    const menuStore = useMenuStore();

    watch(
      () => route.path,
      () => {
        selectedKeys.value = route.matched.map(i => i.aliasOf?.path ?? i.path);
      },
      {
        immediate: true,
      },
    );

    function goto(menu: MenuItem) {
      if (menu.path.startsWith('http')) {
        window.open(menu.path, '_blank');
        return;
      }
      router.push(menu.path);
    }

    function renderItem(routes: MenuItem[], level = 1) {
      return routes.map((route): any => {
        const icon = route.icon ? () => <i class={route.icon} /> : null;
        if (level < 3 && route.children) {
          return (
            <>
              <a-divider margin={6} class="!border-slate-100 px-2"></a-divider>
              {renderItem(route?.children, level + 1)}
            </>
          );
        }
        return (
          <>
            <a-menu-item key={route.path} v-slots={{ icon }}>
              {route.path.startsWith('http') ? (
                <div class="flex items-center justify-between gap-2" onClick={() => goto(route)}>
                  <div>{route.title}</div>
                  <div class="text-xs text-gray-400">
                    {/* <a-badge count={8}>8</a-badge> */}
                    {route.hideIn?.includes('prod') ? <a-tag color="red">{'开发'}</a-tag> : null}
                  </div>
                </div>
              ) : (
                <router-link to={route.path}>
                  <div class="flex items-center justify-between gap-2">
                    <div>{route.title}</div>
                    <div class="text-xs text-gray-400">
                      {/* <a-badge count={8}>8</a-badge> */}
                      {route.hideIn?.includes('prod') ? <a-tag color="red">{'开发'}</a-tag> : null}
                    </div>
                  </div>
                </router-link>
              )}
            </a-menu-item>
          </>
        );
      });
    }

    return () => (
      <a-menu style={{ width: '100%' }} selectedKeys={selectedKeys.value} autoOpenSelected={true} levelIndent={0}>
        {renderItem(menuStore.menus)}
      </a-menu>
    );
  },
});
</script>
