import path from "path";
import { generateApi } from "swagger-typescript-api";
import { loadEnv } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.join(fileURLToPath(new URL(import.meta.url)), "..");
const env = loadEnv("development", process.cwd());

const run = async () => {
  const output = await generateApi({
    url: "http://localhost:3030/openapi.json",
    templates: path.resolve(__dirname, "./template"),
    // output: path.resolve(process.cwd(), "src/api/service"),
    name: "Api.ts",
    singleHttpClient: false,
    httpClientType: "axios",
    unwrapResponseData: false,
    moduleNameIndex: 1,
    moduleNameFirstTag: true,
    cleanOutput: true,
    generateRouteTypes: true,
    extractRequestParams: true,
    modular: false,
    prettier: {
      printWidth: 120,
      tabWidth: 2,
      trailingComma: "all",
      parser: "typescript",
    },
  });
  debugger;
  return output;
};

run();

/**
 * 模板修改备注：
 *
 * route-docs.ejs
 * - 移除 `@description` 关键字
 */
