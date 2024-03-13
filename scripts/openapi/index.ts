import path from 'path';
import { generateApi } from 'swagger-typescript-api';
import { fileURLToPath } from 'url';

const __dirname = path.join(fileURLToPath(new URL(import.meta.url)), '..');

const run = async () => {
  const output = await generateApi({
    /**
     * 数据来源，使用 url 或 input 即可
     */
    // url: "https://petstore.swagger.io/v2/swagger.json",
    input: 'J:\\home\\NestJS.openapi.json',
    /**
     * 使用自定义模板
     * @see https://github.com/acacode/swagger-typescript-api/blob/next/templates/modular
     */
    templates: path.resolve(__dirname, './templates'),
    /**
     * 输出单文件时使用
     */
    // name: "Api.ts",
    /**
     * 输出路径
     */
    output: path.resolve(__dirname, 'generated'),
    /**
     * 输出前清空输出目录
     */
    cleanOutput: true,
    /**
     * 每个模块输出单独文件
     */
    modular: true,
    /**
     * 使用 axios 客户端
     */
    httpClientType: 'axios',
    /**
     * 生成接口调用的代码
     */
    generateClient: true,
    /**
     * 不生成路由类型
     */
    generateRouteTypes: false,
    /**
     * 请求参数类型前缀
     */
    typePrefix: 'Api',
    /**
     * 模块名索引
     */
    moduleNameIndex: 1,
    /**
     * 使用第 1 个标签名作为模块名
     */
    moduleNameFirstTag: true,
    /**
     * 抽取请求参数
     */
    extractRequestParams: true,
    /**
     * 使用 prettier 格式化
     */
    prettier: {
      printWidth: 180,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript',
    },
  });

  return output;
};

run();
