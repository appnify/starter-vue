import 'dayjs';
import { App } from 'vue';

declare module 'dayjs' {
  /**
   * 默认日期时间格式
   */
  export var DATETIME: 'YYYY-MM-DD HH:mm';

  export var DATE: 'YYYY-MM-DD';

  export var TIME: 'HH:mm:ss';

  interface Dayjs {
    _format: Dayjs['format'];
  }

  export var install: (app: App) => void;
}
