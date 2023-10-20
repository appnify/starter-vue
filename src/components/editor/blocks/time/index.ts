import { defineBlocker } from "../../config";
import { font } from "../components/font";
import { Time } from "./interface";
import Option from "./option.vue";
import Render from "./render.vue";

export default defineBlocker<Time>({
  type: "time",
  icon: "icon-park-outline-time",
  title: "时间组件",
  description: "文字",
  render: Render,
  option: Option,
  initial: {
    id: "",
    type: "time",
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
      fontCh: { ...font, content: "HH:mm:ss" },
    },
  },
});
