export interface Block<T = any> {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  bgImage?: string;
  bgColor?: string;
  data: T;
  meta: Record<string, any>;
}

export interface Container {
  id: string;
  type: string;
  title: string;
  description?: string;
  width: number;
  height: number;
  bgImage?: string;
  bgColor?: string;
  children: Block[];
}

export interface Current {
  container: Container;
  block: Block;
}

export type TextAlign = "left" | "center" | "right";

export interface TextStyle {
  text: string;
  family: string;
  size: number;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
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