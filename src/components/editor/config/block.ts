export interface Block<T = any> {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  xFixed: boolean;
  yFixed: boolean;
  bgImage?: string;
  bgColor?: string;
  data: T;
  meta: Record<string, any>;
  actived: false,
  resizable: boolean,
  draggable: boolean,
}

export const DefaultBlock: Block = {
  id: "",
  type: "",
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  xFixed: false,
  yFixed: false,
  bgImage: "",
  bgColor: "",
  data: {},
  meta: {},
  actived: false,
  resizable: true,
  draggable: true,
};
