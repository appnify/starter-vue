<template>
  <div ref="box" class="marquee" :style="marqueeStyle">
    <p ref="text" class="marquee-text" :style="marqueeTextStyle" v-bind="$attrs" @animationend="reset">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default defineComponent({
  name: "marquee",
  props: {
    speed: {
      type: Number,
      default: 10,
    },
    direction: {
      type: String as PropType<"up" | "right" | "down" | "left">,
      default: "left",
    },
    delayTime: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      textAnimation: "",
      timer: null as any,
      boxClientHeight: 0,
      boxClientWidth: 0,
      textClientHeight: 0,
      textClientWidth: 0,
    };
  },
  computed: {
    /**
     * 容器样式
     */
    marqueeStyle() {
      const display = this.isVertical(this.direction) ? "block" : "flex";
      const alignItems = this.isVertical(this.direction) ? "initial" : "center";
      return { display, alignItems };
    },

    /**
     * 文本样式
     */
    marqueeTextStyle() {
      const transform = this.textTransform;
      const animation = this.textAnimation;
      const whiteSpace = this.isHorizontal(this.direction) ? "nowrap" : "normal";
      const direction = this.direction === "right" ? "rtl" : "ltr";
      const unicodeBidi = this.direction === "right" ? "bidi-override" : undefined;
      return {
        transform,
        animation,
        whiteSpace,
        direction,
        unicodeBidi,
      };
    },

    /**
     * 根据容器宽高和文本宽高，动态计算文本的滚动时间
     */
    textDuration() {
      if (["up", "down"].includes(this.direction)) {
        return (this.boxClientHeight + this.textClientHeight) / this.speed;
      }
      return (this.boxClientWidth + this.textClientWidth) / this.speed;
    },

    /**
     * 根据容器宽高和文本宽高，动态计算文本的起始位置
     */
    textTransform() {
      let transform = "";
      switch (this.direction) {
        case "up": {
          transform = `translateY(${this.boxClientHeight}px)`;
          break;
        }
        case "right": {
          transform = `translateX(-100%)`;
          break;
        }
        case "down": {
          transform = `translateY(-100%)`;
          break;
        }
        case "left": {
          transform = `translateX(${this.boxClientWidth}px)`;
          break;
        }
      }
      return transform;
    },
  },
  watch: {
    speed: "marquee",
    direction: "marquee",
  },
  mounted() {
    this.marquee();
  },
  methods: {
    /**
     * 主函数，编辑版式时，使用NextTick也获取不到DOM数据，暂用SetTimeout实现
     */
    marquee() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      setTimeout(() => {
        this.initClient();
        this.initStyle();
        this.startMarquee();
      }, this.delayTime);
    },

    /**
     * 获取容器和文本的宽高
     */
    initClient() {
      const box = this.$refs.box as HTMLElement;
      this.boxClientHeight = box.clientHeight;
      this.boxClientWidth = box.clientWidth;
      const text = this.$refs.text as HTMLElement;
      this.textClientHeight = text.clientHeight;
      this.textClientWidth = text.clientWidth;
    },

    /**
     * 动态设置CSS样式
     */
    initStyle() {
      const head = document.querySelector("head")!;
      let style = document.querySelector("#marqueeanimation")!;
      if (style) {
        style.parentNode?.removeChild(style);
      }
      style = document.createElement("style");
      style.id = "marqueeanimation";

      let transform = "";
      switch (this.direction) {
        case "down":
          transform = `translateY(${this.boxClientHeight}px)`;
          break;
        case "up":
          transform = `translateY(-100%)`;
          break;
        case "right":
          transform = `translateX(${this.boxClientWidth}px)`;
          break;
        case "left":
          transform = `translateX(-100%)`;
          break;
      }

      style.innerHTML = `
        @keyframes marquee-to-${this.direction} {
          100% {
            transform: ${transform}
          }
        }
      `;

      head.appendChild(style);
    },

    /**
     * 开始滚动文本(设置css的animation属性会自动滚动)
     */
    startMarquee() {
      this.textAnimation = `marquee-to-${this.direction} ${this.textDuration}s linear`;
    },

    /**
     * 重置并开始下一轮
     */
    reset() {
      this.$emit("animationend");
      this.textAnimation = "";
      this.timer = setTimeout(this.startMarquee, this.delayTime);
    },

    /**
     * 是否水平方向滚动
     */
    isVertical(direction: string) {
      return ["up", "down"].includes(direction);
    },

    /**
     * 是否垂直方向滚动
     */
    isHorizontal(direction: string) {
      return ["left", "right"].includes(direction);
    },
  },
  beforeDestory() {
    clearTimeout(this.timer);
  },
});
</script>

<style scoped>
.marquee {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.marquee-text {
  margin: 0;
  padding: 0;
  line-height: normal;
}
</style>
