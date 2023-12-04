import { Block } from '../../core';

export interface ImagePramsImage {
  id: any;
  title: string;
  url: string;
}

export interface ImagePrams {
  fit: 'cover' | 'contain';
  switchTime: number;
  images: ImagePramsImage[];
}

/**
 * 图片组件
 */
export type Image = Block<ImagePrams>;

export const fitOptions = [
  {
    label: '保持比例，适应容器',
    value: 'contain',
  },
  {
    label: '保持比例，占满容器',
    value: 'cover',
  },
  {
    label: '拉伸比例，占满容器',
    value: '100% 100%',
  },
];
