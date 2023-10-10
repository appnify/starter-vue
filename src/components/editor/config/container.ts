
export interface Container {
  id: number | string;
  title: string;
  description?: string;
  width: number;
  height: number;
  bgImage?: string;
  bgColor?: string;
  zoom: number;
}
