import Option from "./option.vue";
import Render from "./render.vue";
import { Font } from "./interface";
export * from "./interface";

export const FontRender = Render;
export const FontOption = Option;

export const font: Font = {
  content: "请输入文字",
  family: "microsoft yahei",
  size: 24,
  color: "#000000",
  bold: false,
  italic: false,
  underline: false,
  align: 3,
};
