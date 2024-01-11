import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { presetIcons, presetUno } from 'unocss';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import AutoComponent from 'unplugin-vue-components/vite';
import router from 'unplugin-vue-router/vite';
import { defineConfig, loadEnv } from 'vite';
import Page from 'vite-plugin-pages';
import { arcoToUnoColor } from './scripts/vite/color';
import iconFile from './scripts/vite/file.json';
import iconFmt from './scripts/vite/fmt.json';
import extension from './scripts/vite/plugin-extension';
import info from './scripts/vite/plugin-info';

/**
 * vite 配置
 * @see https://cn.vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const base = env.VITE_BASE ?? '/';
  const host = env.VITE_HOST ?? '0.0.0.0';
  const port = Number(env.VITE_PORT ?? 3020);

  return {
    base,
    plugins: [
      /**
       * 提供路由自动生成
       * @see https://github.com/posva/unplugin-vue-router
       */
      router({
        dts: 'src/types/auto-router.d.ts',
        exclude: ['**/components/*', '**/*.*.*', '**/!(index).*'],
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
        dts: 'src/types/auto-import.d.ts',
        imports: ['vue', 'vue-router'],
        resolvers: [ArcoResolver()],
      }),

      /**
       * 提供vue组件的自动导入
       * @see https://github.com/antfu/unplugin-vue-components
       */
      AutoComponent({
        dts: 'src/types/auto-component.d.ts',
        resolvers: [ArcoResolver({ sideEffect: false })],
      }),

      /**
       * 提供基于文件系统的路由生成
       * @see https://github.com/hannoeru/vite-plugin-pages
       */
      Page({
        exclude: ['**/components/*', '**/*.*.*', '**/!(index).*'],
        importMode: 'sync',
        extensions: ['vue'],
        onRoutesGenerated(routes) {
          const isProd = mode !== 'development';
          const result = [];
          for (const route of routes) {
            const { hide } = route.meta ?? {};
            if (!route.meta) {
              continue;
            }
            if (hide === true) {
              continue;
            }
            if (isProd && hide === 'prod') {
              continue;
            }
            result.push(route);
          }
          return result;
        },
      }),

      /**
       * 提供CSS和图标的按需生成
       * @see https://github.com/unocss/unocss#readme
       */
      Unocss({
        theme: {
          colors: {
            brand: arcoToUnoColor('primary'),
          },
        },
        include: ['src/**/*.{vue,ts,tsx,css,scss,sass,less,styl}'],
        presets: [
          presetUno(),
          presetIcons({
            prefix: '',
            collections: {
              'icon-file': iconFile,
              'icon-fmt': iconFmt,
            },
          }),
        ],
      }),

      /**
       * 提供产物分析报告
       * @see https://github.com/btd/rollup-plugin-visualizer
       */
      visualizer({
        title: `构建统计 | ${env.VITE_SUBTITLE}`,
        filename: '.gitea/stat.html',
      }),

      /**
       * 项目插件，打包时注入版本信息
       * @see ./scripts/vite/plugin-info.ts
       */
      info(),

      /**
       * 项目插件，添加文件后缀加载内容
       * @see ./scripts/vite/plugin-extension.ts
       */
      extension(),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    server: {
      host,
      port,
      proxy: {
        '/api': {
          target: env.VITE_PROXY,
        },
        '/upload': {
          target: env.VITE_PROXY,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/styles/css-arco.less')}";`,
            arcoblue: '#66f',
          },
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
    },
  };
});
