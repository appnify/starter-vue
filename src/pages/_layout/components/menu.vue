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
      if (route.external) {
        window.open(route.path, '_blank');
        return;
      }
      router.push(route.path);
    }

    function renderItem(routes: MenuItem[]) {
      return routes.map(route => {
        const icon = route.icon ? () => <i class={route.icon} /> : null;
        const node: any = route.children?.length ? (
          <>
            <div class="px-2">
              <a-divider margin={6} class="!border-slate-100"></a-divider>
            </div>
            {renderItem(route?.children)}
          </>
        ) : (
          <a-menu-item key={route.path} v-slots={{ icon }} onClick={() => goto(route)}>
            <div class="flex items-center justify-between gap-2 pr-4">
              <div>{route.title}</div>
              <div class="text-xs text-gray-400">
                {/* <a-badge count={8}>8</a-badge> */}
                { route.only === 'dev' ? '仅开发' : null }
              </div>
            </div>
          </a-menu-item>
        );
        return node;
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
