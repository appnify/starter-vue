import { defineBlocker } from '../../core';
import { Image } from './interface';
import Option from './option.vue';
import Render from './render.vue';

export default defineBlocker<Image>({
  type: 'image',
  icon: 'icon-park-outline-pic',
  title: '图片组件',
  description: '文字',
  render: Render,
  option: Option,
  initial: {
    id: '',
    type: 'image',
    title: '',
    x: 0,
    y: 0,
    w: 300,
    h: 100,
    xFixed: false,
    yFixed: false,
    bgImage: '',
    bgColor: '',
    meta: {},
    actived: false,
    resizable: true,
    draggable: true,
    params: {
      fit: 'cover',
      switchTime: 500,
      images: [],
    },
  },
});
