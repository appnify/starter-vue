import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { presetIcons, presetUno } from "unocss";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import AutoComponent from "unplugin-vue-components/vite";
import AutoRouter from "unplugin-vue-router/vite";
import { defineConfig, loadEnv } from "vite";
import Page from "vite-plugin-pages";
import { arcoToUnoColor } from "./scripts/vite/color";
import fileIcon from "./scripts/vite/icon-file.json";
import plugin from "./scripts/vite/plugin";

/**
 * vite 配置
 * @see https://cn.vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const host = env.VITE_HOST ?? "0.0.0.0";
  const port = Number(env.VITE_PORT ?? 3020);
  return {
    base: "./",
    plugins: [
      /**
       * 自动路由生成(须在vue插件前)
       * @see https://github.com/posva/unplugin-vue-router
       */
      AutoRouter({
        exclude: ["**/components/*.vue", "**/*.*.vue"],
        dts: "src/types/auto-router.d.ts",
      }),

      /**
       * 提供 Vue 3 单文件组件支持
       * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
       */
      Vue({
        script: {
          defineModel: true,
        },
      }),

      /**
       * 提供 Vue 3 JSX 支持
       * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx
       */
      VueJsx(),

      /**
       * 提供vue等api的自动导入
       * @see https://github.com/antfu/unplugin-auto-import#readme
       */
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [ArcoResolver()],
        dts: "./src/types/auto-import.d.ts",
      }),

      /**
       * 提供vue组件的自动导入
       * @see https://github.com/antfu/unplugin-vue-components
       */
      AutoComponent({
        resolvers: [ArcoResolver({ sideEffect: false })],
        dts: "./src/types/auto-component.d.ts",
      }),

      /**
       * 提供基于文件系统的路由生成
       * @see https://github.com/hannoeru/vite-plugin-pages
       */
      Page({
        exclude: ["**/components/*.vue", "**/*.*.vue"],
      }),

      /**
       * 提供CSS和图标的按需生成
       * @see https://github.com/unocss/unocss#readme
       */
      Unocss({
        theme: {
          colors: {
            brand: arcoToUnoColor("primary"),
          },
        },
        include: ["src/**/*.{vue,ts,tsx,css,scss,sass,less,styl}"],
        presets: [
          presetUno(),
          presetIcons({
            prefix: "",
            collections: {
              "icon-file": (() => {
                const icons = {};
                for (const item of fileIcon) {
                  icons[item.font_class] = item.show_svg;
                }
                return icons;
              })(),
            },
          }),
        ],
      }),

      /**
       * 项目插件，打包时注入版本信息、基于文件后缀打包等
       * @see ./scripts/vite/plugin.ts
       */
      plugin(),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: "/src",
        },
      ],
    },
    server: {
      host,
      port,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import (reference) "${resolve("src/styles/css-arco.less")}";`,
            arcoblue: "#66f",
          },
        },
      },
    },
  };
});
