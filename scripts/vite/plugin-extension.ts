import fs from 'fs';
import { Plugin, ResolvedConfig } from 'vite';

/**
 * 条件加载
 * @description
 * 先尝试 index.xx.vue 文件，
 * 回退至 index.vue 文件。
 */
export default function plugin(): Plugin {
  let config: ResolvedConfig;
  let extension: string;

  return {
    name: 'vite:extension',
    enforce: 'pre',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      extension = config.env.VITE_EXTENTION ?? config.isProduction ? 'prod' : 'dev';
    },

    load(id) {
      if (!extension || !id.includes('src')) {
        return;
      }
      if (id.includes('?vue')) {
        return;
      }
      const targetPath = id.replace(/\.([^.]*?)$/, `.${extension}.$1`);
      if (targetPath && fs.existsSync(targetPath)) {
        return fs.readFileSync(targetPath, 'utf-8');
      }
    },
  };
}
