import { defineBlocker } from "../../config";
import Render from "./render.vue";
import Option from "./option.vue";
import { TextData } from "./interface";

export default defineBlocker<TextData>({
  type: "text",
  icon: "icon-park-outline-text",
  title: "文本组件",
  description: "文字",
  render: Render,
  option: Option,
  initial: {
    id: "",
    type: "text",
    x: 0,
    y: 0,
    w: 300,
    h: 100,
    xFixed: false,
    yFixed: false,
    bgImage: "",
    bgColor: "",
    meta: {},
    actived: false,
    resizable: true,
    draggable: true,
    data: {
      marquee: false,
      marqueeSpeed: 1,
      marqueeDirection: "left",
      fontCh: {
        content: "请输入文字",
        family: "微软雅黑",
        size: 14,
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        align: 3,
      },
    },
  },
});
