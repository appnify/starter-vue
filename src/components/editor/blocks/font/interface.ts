import { CSSProperties, StyleValue } from "vue";

export interface Font {
  /**
   * 文字内容
   */
  content: string;
  /**
   * 字体
   */
  family: string;
  /**
   * 字号(px)
   */
  size: number;
  /**
   * 颜色(16进制)
   */
  color: string;
  /**
   * 是否加粗
   */
  bold: boolean;
  /**
   * 是否斜体
   */
  italic: boolean;
  /**
   * 是否下划线
   */
  underline: boolean;
  /**
   * 对齐方式
   */
  align: number;
}

export const AlignOptions = [
  {
    label: "居上",
    value: 1,
  },
  {
    label: "居下",
    value: 2,
  },
  {
    label: "居中",
    value: 3,
  },
  {
    label: "居左",
    value: 4,
  },
  {
    label: "居右",
    value: 5,
  },
];

export const FontFamilyOptions = [
  {
    label: "微软雅黑",
    value: "microsoft yahei",
  },
  {
    label: "黑体",
    value: "gothic",
  },
  {
    label: "宋体",
    value: "simsun",
  },
  {
    label: "Arial",
    value: "arial",
  },
];

export const getFontStyle = (font: Font) => {
  const { size, family: fontFamily, color, bold, italic, underline, align } = font;
  const fontSize = `${size}px`;
  const fontWeight = bold ? "bold" : "normal";
  const fontStyle = italic ? "italic" : "normal";
  const textDecoration = underline ? "underline" : "none";
  let textAlign = "left";
  let verticalAlign = "middle";

  switch (align) {
    case 1:
      textAlign = "center";
      verticalAlign = "top";
      break;
    case 2:
      textAlign = "center";
      verticalAlign = "bottom";
      break;
    case 3:
      textAlign = "center";
      verticalAlign = "middle";
      break;
    case 4:
      textAlign = "left";
      verticalAlign = "middle";
      break;
    case 5:
      textAlign = "right";
      verticalAlign = "middle";
      break;
    default:
      break;
  }

  return {
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    textDecoration,
    color,
    textAlign,
    verticalAlign,
  } as CSSProperties;
};
