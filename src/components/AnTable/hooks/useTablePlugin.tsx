import { TableUseOptions } from './useTable';

export interface AnTablePlugin {
  /**
   * 插件ID(唯一)
   * @example
   * ```ts
   * 'Plugin:Refresh'
   * ```
   */
  id: string;
  /**
   * 提供给其他插件使用的变量
   * @example
   * ```ts
   * { isOk: true }
   * ```
   */
  provide?: Recordable;
  /**
   * 组件钩子
   */
  onSetup?: (context: any) => void;
  /**
   * 钩子
   */
  options?: (options: TableUseOptions) => TableUseOptions | null | undefined | void;
  /**
   * 添加部件栏组件
   */
  widget?: () => any;
  /**
   * 添加操作栏组件
   */
  action?: () => any;
  /**
   * 搜索前处理
   *
   */
  onBeforeSearch?: (args: { page: number; size: number; [key: string]: any }) => Recordable | null | undefined | void;
  onPageChange?: (page: number) => void;
  onSizeChange?: (size: number) => void;
}

export class PluginContainer {
  actions: any[] = [];
  widgets: any[] = [];

  constructor(private plugins: AnTablePlugin[]) {
    for (const plugin of plugins) {
      const action = plugin.action?.();
      const widget = plugin.widget?.();
      if (action) {
        this.actions.push(action);
      }
      if (widget) {
        this.widgets.push(widget);
      }
    }
  }

  callSetupHook(context: any) {
    for (const plugin of this.plugins) {
      plugin.onSetup?.(context);
    }
  }

  callOptionsHook(options: any) {
    for (const plugin of this.plugins) {
      options = plugin.options?.(options) ?? options;
    }
    return options;
  }

  callActionHook(options: any) {
    for (const plugin of this.plugins) {
      options = plugin.options?.(options) ?? options;
    }
    return options;
  }

  callWidgetHook(options: any) {
    for (const plugin of this.plugins) {
      options = plugin.options?.(options) ?? options;
    }
    return options;
  }

  callBeforeSearchHook(options: any) {
    for (const plugin of this.plugins) {
      options = plugin.onBeforeSearch?.(options) ?? options;
    }
    return options;
  }

  callPageChangeHook(page: number) {
    for (const plugin of this.plugins) {
      plugin.onPageChange?.(page);
    }
  }

  callSizeChangeHook(page: number) {
    for (const plugin of this.plugins) {
      plugin.onPageChange?.(page);
    }
  }
}
