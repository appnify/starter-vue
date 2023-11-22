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
   * 组件钩子
   * @description 对应表格组件的 `setup` 钩子
   */
  onSetup?: (context: AnTableContext) => void;

  /**
   * 钩子
   * @description 在处理前进行参数处理
   */
  options?: (options: TableUseOptions) => TableUseOptions | null | undefined | void;

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
    this.plugins.unshift(
      useTableRefresh(),
      useColumnConfig(),
      useRowFormat(),
      useRowDelete(),
      useRowModify()
    );
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
