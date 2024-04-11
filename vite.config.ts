import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import AutoComponent from 'unplugin-vue-components/vite'
import { TreeNode, VueRouterAutoImports } from 'unplugin-vue-router'
import AutoRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import extension from './scripts/vite/plugin-extension'
import info from './scripts/vite/plugin-info'

/**
 * vite 配置
 * @see https://cn.vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_BASE ?? '/'
  const host = env.VITE_HOST ?? '0.0.0.0'
  const port = Number(env.VITE_PORT ?? 3020)

  return {
    base,
    plugins: [
      /**
       * 提供路由自动生成
       * @description 需放在 @vitejs/plugin-vue 之前
       * @see https://uvr.esm.is/introduction.html
       */
      AutoRouter({
        dts: 'src/types/auto-router.d.ts',
        exclude: ['**/components/**/*', '**/*.*.*'],
        extendRoute(route) {
          const overrides = (route as any).node.value.overrides
          if (overrides.meta?.empty) {
            route.components.clear()
          }
          if (route.name.startsWith('/_')) {
            route.path = route.name.replace(/^\/_/, '/')
          }
        },
        beforeWriteFiles(rootRoute) {
          const routes = (rootRoute as any).node.children as Map<string, TreeNode>
          const appRoot = routes.get('_app')
          if (!appRoot) {
            return
          }
          for (const [name, route] of routes.entries()) {
            if (route.name.startsWith('/_')) {
              continue
            }
            routes.delete(name)
            appRoot.children.set(name, route)
          }
        },
      }),

      /**
       * 提供 Vue 3 单文件组件支持
       * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
       */
      Vue(),

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
        imports: ['vue', VueRouterAutoImports],
        resolvers: [ArcoResolver()],
      }),

      /**
       * 提供vue组件的自动导入
       * @see https://github.com/antfu/unplugin-vue-components
       */
      AutoComponent({
        dts: 'src/types/auto-component.d.ts',
        exclude: ['**/AnEditor/**/*'],
        resolvers: [ArcoResolver({ sideEffect: false })],
      }),

      /**
       * 提供CSS和图标的按需生成
       * @see https://github.com/unocss/unocss#readme
       */
      Unocss(),

      /**
       * 提供产物分析报告
       * @see https://github.com/btd/rollup-plugin-visualizer
       */
      visualizer({
        title: `构建统计 | ${env.VITE_SUBTITLE}`,
        filename: 'dist/stat.html',
      }),

      /**
       * 项目插件，打包时注入版本信息
       * @see /scripts/vite/plugin-info.ts
       */
      info(),

      /**
       * 项目插件，添加文件后缀加载内容
       * @see /scripts/vite/plugin-extension.ts
       */
      extension(),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
        {
          find: 'arconify',
          replacement: 'J:\\github\\arconify\\src\\main.ts',
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
  }
})
