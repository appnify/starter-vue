import 'vite';

interface ImportMetaEnv {
  /**
   * 网站标题
   */
  VITE_TITLE: string;
  /**
   * 网站副标题
   */
  VITE_SUBTITLE: string;
  /**
   * 自定义的文件后缀
   */
  VITE_EXTENSION: string;
  /**
   * API 地址
   */
  VITE_API_BASE_URL: string;
  /**
   * 开发服务器主机
   */
  VITE_HOST: string;
  /**
   * 开发服务器端口
   */
  VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
