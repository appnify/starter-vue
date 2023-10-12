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
  actived: boolean;
  resizable: boolean;
  draggable: boolean;
  meta: Record<string, any>;
  params: T;
}
