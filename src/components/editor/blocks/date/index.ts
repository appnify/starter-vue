import { defineBlocker } from "../../core";
import { font } from "../font";
import { Date } from "./interface";
import Option from "./option.vue";
import Render from "./render.vue";

export default defineBlocker<Date>({
  type: "date",
  icon: "icon-park-outline-calendar",
  title: "日期组件",
  description: "文字",
  render: Render,
  option: Option,
  initial: {
    id: "",
    type: "date",
    title: '',
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
    params: {
      format: "YYYY-MM-DD",
      fontCh: { ...font, content: "YYYY-MM-DD" },
    },
  },
});
