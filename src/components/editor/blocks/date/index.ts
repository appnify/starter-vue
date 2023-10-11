import { defineBlocker } from "../../config";
import { DateData } from "./interface";
import Option from "./option.vue";
import Render from "./render.vue";

export default defineBlocker<DateData>({
  type: "date",
  icon: "icon-park-outline-calendar",
  title: "日期组件",
  description: "文字",
  render: Render,
  option: Option,
  initial: {
    id: "",
    type: "date",
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
      format: "YYYY-MM-DD",
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
