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
        selectedKeys.value = route.matched.map(i => i.path);
      },
      { immediate: true }
    );

    function goto(route: MenuItem) {
      menuStore.current = route;
      if (route.link) {
        window.open(route.link, '_blank');
        return;
      }
      router.push(route.path);
    }

    function renderItem(routes: MenuItem[], level = 1) {
      return routes.map((route): any => {
        const icon = route.icon ? () => <i class={route.icon} /> : null;
        if (level < 3 && route.children?.some(i => !i.hide)) {
          return (
            <>
              <a-divider margin={6} class="!border-slate-100 px-2"></a-divider>
              {renderItem(route?.children, level + 1)}
            </>
          );
        }
        return (
          <>
            <a-menu-item key={route.path} v-slots={{ icon }} onClick={() => goto(route)}>
              <div class="flex items-center justify-between gap-2">
                <div>{route.title}</div>
                <div class="text-xs text-gray-400">
                  {/* <a-badge count={8}>8</a-badge> */}
                  {route.hide === 'prod' ? <a-tag color="blue">{'开发'}</a-tag> : null}
                </div>
              </div>
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
