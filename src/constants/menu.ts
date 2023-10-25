import { defineConstants } from "./defineConstants";

export enum MenuType {
  /**
   * 目录
   */
  MENU = 1,
  /**
   * 页面
   */
  PAGE = 2,
  /**
   * 按钮
   */
  BUTTON = 3,
}

export const MenuTypes = defineConstants([
  {
    value: MenuType.MENU,
    label: "目录",
    color: 'purple'
  },
  {
    value: MenuType.PAGE,
    label: "页面",
    color: 'green'
  },
  {
    value: MenuType.BUTTON,
    label: "按钮",
    color: 'blue'
  },
]);
