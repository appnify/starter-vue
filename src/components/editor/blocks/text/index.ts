import { Block, Blocker, defineBlocker } from '../../core';
import { font } from '../font';
import { Text } from './interface';
import Option from './option.vue';
import Render from './render.vue';

export default defineBlocker<Text>({
  type: 'text',
  icon: 'icon-park-outline-text',
  title: '文本组件',
  description: '文字',
  render: Render,
  option: Option,
  initial: {
    id: '',
    type: 'text',
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
      marquee: false,
      speed: 100,
      direction: 'left',
      fontCh: {
        ...font,
        content:
          '温馨提示：乘客您好，进站检票时，持票卡的乘客请在右侧闸机上方感应区内验票，扫码过闸的乘客请将乘车码对准闸机扫码口，扇门打开后依次进闸。乘车过程中请妥善保管好车票，以免丢失。',
      },
    },
  },
});

export function useTextBlock(): Blocker<Text> {
  const initialData: Text = {
    id: '',
    type: 'text',
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
      marquee: false,
      speed: 100,
      direction: 'left',
      fontCh: {
        ...font,
        content:
          '温馨提示：乘客您好，进站检票时，持票卡的乘客请在右侧闸机上方感应区内验票，扫码过闸的乘客请将乘车码对准闸机扫码口，扇门打开后依次进闸。乘车过程中请妥善保管好车票，以免丢失。',
      },
    },
  };
  return {
    type: 'text',
    icon: 'icon-park-outline-text',
    title: '文本组件',
    description: '文字',
    render: Render,
    option: Option,
    initial: initialData,
    addLeftTab() {
      return {
        title: '文本测试',
        icon: 'icon-park-outline-user',
        component: () => h('div', null, 'TODO')
      }
    },
  };
}
