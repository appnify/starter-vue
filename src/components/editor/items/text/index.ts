import { defineBlocker } from '../../config'
import Option from './option.vue'
import Render from './render.vue'
export * from './interface'

export default defineBlocker({
  initial: {
    id: "",
    type: "text",
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
  },
  render: Render,
  option: Option,
})

