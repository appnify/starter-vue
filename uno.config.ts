import { defineConfig, presetIcons, presetUno } from 'unocss';
import { arcoToUnoColor } from './scripts/vite/color';
import iconFile from './scripts/vite/file.json';
import iconFmt from './scripts/vite/fmt.json';

/**
 * 提供CSS和图标的按需生成
 * @see https://github.com/unocss/unocss#readme
 */
export default defineConfig({
  theme: {
    colors: {
      brand: arcoToUnoColor('primary'),
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        'icon-file': iconFile,
        'icon-fmt': iconFmt,
      },
    }),
  ],
});
