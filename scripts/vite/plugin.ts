import { spawn } from "child_process";
import fs from "fs";
import { Plugin, ResolvedConfig } from "vite";
import pkg from "../../package.json";

/**
 * 项目 logo
 * @description 内容：APPTIFY
 */
const LOGO = `      _       _______  _______  ____  _____  _____  ________  ____  ____
     / \\\\     |_   __ \\\\|_   __ \\\\|_   \\\\|_   _||_   _||_   __  ||_  _||_  _|
    / _ \\\\      | |__) | | |__) | |   \\\\ | |    | |    | |_ \\\\_|  \\\\ \\\\  / /
   / ___ \\\\     |  ___/  |  ___/  | |\\\\ \\\\| |    | |    |  _|      \\\\ \\\\/ /
 _/ /   \\\\ \\\\_  _| |_    _| |_    _| |_\\\\   |_  _| |_  _| |_       _|  |_
|____| |____||_____|  |_____|  |_____|\\\\____||_____||_____|     |______|
`;

/**
 * 以 shell 形式执行命令，成功返回输出的字符串
 * @param cmd 命令
 * @returns Promise<string | void>
 */
const exec = (cmd: string) => {
  return new Promise<string | void>((resolve) => {
    if (!cmd) {
      return resolve();
    }
    const child = spawn(cmd, [], { shell: true });
    child.stdout.once("data", (data) => {
      resolve(data.toString().replace(/"|\n/g, ""));
    });
    child.stderr.once("data", () => {
      resolve();
    });
  });
};

/**
 * 获取构建信息
 * @returns Promise<string>
 */
const getBuildInfo = async () => {
  const hash = await exec("git log --format=%h -n 1");
  const time = new Date().toLocaleString("zh-Hans-CN");
  const latestTag = await exec("git describe --tags --abbrev=0");
  const commits = await exec(`git rev-list --count ${latestTag}..HEAD`);
  const version = commits ? `${latestTag}.${commits}` : `v${pkg.version}`;
  const content = `欢迎访问！版本: ${version}  标识: ${hash}  构建: ${time}`;
  const style = `"color: #09f; font-weight: 900;", "font-size: 12px; color: #09f; font-family: ''"`;
  const script = `console.log(\`%c${LOGO} \n%c${content}\n\`, ${style});\n`;
  return script;
};

/**
 * 项目构建插件
 * @returns Plugin
 */
export default function plugin(): Plugin {
  let config: ResolvedConfig;
  let extension: string;

  return {
    name: "vite:customizer",
    enforce: "pre",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      extension = config.env.VITE_EXTENTION ?? config.isProduction ? "prod" : "dev";
    },

    async transformIndexHtml() {
      const script = await getBuildInfo();
      return [
        {
          tag: "script",
          injectTo: "body",
          children: script,
        },
      ];
    },

    load(id) {
      if (!extension || !id.includes("src")) {
        return;
      }
      if (id.includes("?vue")) {
        return;
      }
      const targetPath = id.replace(/\.([^.]*?)$/, `.${extension}.$1`);
      if (targetPath && fs.existsSync(targetPath)) {
        return fs.readFileSync(targetPath, "utf-8");
      }
    },
  };
}
