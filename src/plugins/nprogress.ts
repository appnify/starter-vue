import NProgress from 'nprogress';
import { App } from 'vue';

declare module 'nprogress' {
  interface NProgress {
    install: (app: App) => void;
  }
}

/**
 * 作为VUE插件进行初始化
 */
NProgress.install = function (app: App) {
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
  });
};

export { NProgress };
