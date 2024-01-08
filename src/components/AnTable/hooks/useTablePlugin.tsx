import { Component } from 'vue';
import { AnTableContext } from '../components/Table';
import { TableUseOptions } from './useTable';
import { TableColumn } from './useTableColumn';
import { useTableRefresh } from '../plugins/useTableRefresh';
import { useColumnConfig } from '../plugins/useTableConfig';
import { useRowFormat } from '../plugins/useRowFormat';
import { useRowDelete } from '../plugins/useRowDelete';
import { useRowModify } from '../plugins/useRowModify';

export interface AnTablePlugin {
  /**
   * 插件ID(唯一)
   * @example
   * ```ts
   * 'refresh'
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
   * 在表格组件的 `setup` 函数中调用
   */
  onSetup?: (context: AnTableContext) => void;

  /**
   * 钩子
   */
  options?: (options: TableUseOptions) => TableUseOptions | null | undefined | void;

  /**
   * 解析参数之前调用
   */
  parse?: (options: TableUseOptions) => TableUseOptions | null | undefined | void;

  /**
   * 解析参数之后调用
   */
  parsed?: (options: any) => any;

  /**
   * 表格列
   */
  column?: (column: TableColumn) => TableColumn;

  /**
   * 添加部件栏组件
   * @example
   * ```tsx
   * () => <Button>测试</Button>
   * ```
   */
  widget?: () => (props: any) => any | Component;

  /**
   * 添加操作栏组件
   * @example
   * ```tsx
   * () => <Button>测试</Button>
   * ```
   */
  action?: () => (props: any) => any | Component;

  onSearch?: (search: Recordable) => any[] | { data: any[]; total: number };

  onLoad?: (search: Recordable) => void;
  onLoaded?: (res: any) => void;
  onLoadOk?: (res: any) => void;
  onLoadFail?: (e: any) => void;
}

const callHookWithData = async (name: string, plugins: AnTablePlugin[], data?: any) => {
  for (const plugin of plugins) {
    data = (await (plugin as any)[name]?.(data)) ?? data;
  }
  return data;
};

const callHookFirst = async (name: string, plugins: AnTablePlugin[], ...args: any[]) => {
  for (const plugin of plugins) {
    const data = await (plugin as any)[name]?.(...args);
    if (data) {
      return data;
    }
  }
  return null;
};

export class PluginContainer {
  actions: any[] = [];
  widgets: any[] = [];

  constructor(private plugins: AnTablePlugin[]) {
    this.plugins.unshift(useTableRefresh(), useRowFormat(), useRowDelete(), useRowModify());
    for (const plugin of plugins) {
      const action = plugin.action?.();
      if (action) {
        this.actions.push(action);
      }
      const widget = plugin.widget?.();
      if (widget) {
        this.widgets.push(widget);
      }
    }
  }

  callSetupHook(context: AnTableContext) {
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

  callLoadHook(data: any[] | ((...args: any[]) => Promise<any> | any), params: Recordable) {
    return callHookFirst('onLoad', this.plugins, data, params);
  }

  callLoadedHook(res: any) {
    return callHookWithData('onLoaded', this.plugins, res);
  }

  callLoadOkHook(res: any) {
    return callHookWithData('onLoadOk', this.plugins, res);
  }

  callLoadFailHook(res: any) {
    return callHookWithData('onLoadFail', this.plugins, res);
  }
}
