import { Button } from '@arco-design/web-vue';
import { AnTablePlugin } from '../hooks/useTablePlugin';

/**
 * 插件：添加刷新按钮
 * @description 位于搜索栏附近
 */
export function useRefresh(): AnTablePlugin {
  let context: any = {};

  return {
    id: 'refresh',
    onSetup(ctx) {
      context = ctx;
    },
    widget() {
      return () => {
        const { loading, refresh } = context;
        return (
          <Button disabled={loading.value} onClick={refresh}>
            {{
              icon: () => <span class="icon-park-outline-redo"></span>,
            }}
          </Button>
        );
      };
    },
  };
}
