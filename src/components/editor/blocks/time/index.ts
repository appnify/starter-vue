import { defineBlocker } from "../../config";
import { TimeData } from "./interface";
import Option from "./option.vue";
import Render from "./render.vue";

export default defineBlocker<TimeData>({
  type: "time",
  icon: "icon-park-outline-time",
  title: "时间组件",
  description: "文字",
  render: Render,
  option: Option,
  initial: {
    id: "",
    type: "time",
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
      format: "HH:mm:ss",
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
