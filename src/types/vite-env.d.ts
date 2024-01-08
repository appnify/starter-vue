/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "numeral" {
  const numeral: any;
  export default numeral;
}

declare module 'dplayer' {
  const dp: any;
  export default dp;
}

type Recordable = Record<string, any>;