<script lang="tsx">
import { MenuItem, menus } from "@/router";

export default defineComponent({
  name: "LayoutMenu",
  setup() {
    const selectedKeys = ref<string[]>([]);
    const route = useRoute();

    watch(
      () => route.path,
      () => {
        selectedKeys.value = route.matched.map((i) => i.aliasOf?.path ?? i.path);
      },
      { immediate: true }
    );

    return { selectedKeys };
  },
  methods: {
    goto(route: MenuItem) {
      if (route.external) {
        window.open(route.path, "_blank");
        return;
      }
      this.$router.push(route);
    },

    renderItem(routes: MenuItem[], isTop = false) {
      return routes.map((route) => {
        const icon = route.icon ? () => <i class={route.icon} /> : null;
        const node: any = route.children?.length ? (
          <>
            <div class="px-2">
              <a-divider margin={6} class="!border-slate-100"></a-divider>
            </div>
            {this.renderItem(route?.children)}
          </>
        ) : (
          <a-menu-item key={route.path} v-slots={{ icon }} onClick={() => this.goto(route)}>
            {route.title}
            {false && <span class="text-xs text-slate-400 ml-2">({route.sort})</span>}
          </a-menu-item>
        );

        return node;
      });
    },
  },

  render() {
    return (
      <a-menu
        style={{ width: "100%" }}
        breakpoint="xl"
        selectedKeys={this.selectedKeys}
        autoOpenSelected={true}
        levelIndent={0}
      >
        {this.renderItem(menus, true)}
      </a-menu>
    );
  },
});
</script>
