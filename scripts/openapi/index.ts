import path from "path";
import { generateApi } from "swagger-typescript-api";
import { loadEnv } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.join(fileURLToPath(new URL(import.meta.url)), "..");
const env = loadEnv("development", process.cwd());

const run = async () => {
  const output = await generateApi({
    url: env.VITE_API_DOCS_URL,
    templates: path.resolve(__dirname, "./template"),
    output: path.resolve(process.cwd(), "src/api/service"),
    name: "index.ts",
    singleHttpClient: false,
    httpClientType: "axios",
    unwrapResponseData: false,
    moduleNameIndex: 1,
    moduleNameFirstTag: true,
    cleanOutput: true,
    // generateRouteTypes: true,
    extractRequestParams: true,
    modular: false,
    prettier: {
      printWidth: 120,
      tabWidth: 2,
      trailingComma: "all",
      parser: "typescript",
    },
  });
  // const { configuration, getTemplate, renderTemplate, createFile } = output
  // const { config } = configuration
  // const { templateInfos } = config
  // const templateMap = templateInfos.reduce((acc, { fileName, name }) => ({
  //   ...acc,
  //   [name]: getTemplate({ fileName, name }),
  // }),
  //   {});
  // const files = [
  //   {
  //     path: config.output,
  //     fileName: 'dataContracts.ts',
  //     content: renderTemplate(templateMap.dataContracts, configuration),
  //   },
  //   {
  //     path: config.output,
  //     fileName: 'httpClient.ts',
  //     content: renderTemplate(templateMap.httpClient, configuration),
  //   },
  //   {
  //     path: config.output,
  //     fileName: 'apiClient.ts',
  //     content: renderTemplate(templateMap.api, configuration),
  //   }
  // ]
  // for (const file of files) {
  //   createFile(file)
  // }
  debugger
  return output;
};

run();
