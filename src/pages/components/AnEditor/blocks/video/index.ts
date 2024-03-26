import { defineBlocker } from '../../core';
import { Video } from './interface';
import Option from './option.vue';
import Render from './render.vue';

export default defineBlocker<Video>({
  type: 'video',
  icon: 'i-icon-park-outline-video',
  title: '视频组件',
  description: '文字',
  render: Render,
  option: Option,
  initial: {
    id: '',
    type: 'video',
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
      type: 'file',
      url: 'https://example.com/live',
      videos: [],
      fit: 'cover',
    },
  },
});
