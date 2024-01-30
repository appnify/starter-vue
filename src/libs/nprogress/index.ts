import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './nprogress.css';
import { App } from 'vue';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

/**
 * 作为VUE插件进行初始化
 */
NProgress.install = function (app: App) {};

export { NProgress };
