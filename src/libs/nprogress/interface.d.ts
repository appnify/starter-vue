import 'nprogress';
import { App } from 'vue';

declare module 'nprogress' {
  interface NProgress {
    install: (app: App) => void;
  }
}
