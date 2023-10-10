export interface Text {
  /**
   * 文字内容
   */
  text: string;
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

export const DefaultText: Text = {
  text: "双击编辑文字",
  family: "microsoft yahei",
  size: 14,
  color: "#000000",
  bold: false,
  italic: false,
  underline: false,
  align: 3,
}

export const TextAlignOptions = [
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

export const TextFamilyOptions = [
  {
    label: "微软雅黑111111111",
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
