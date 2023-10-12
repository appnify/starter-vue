import { Blocker } from "../config";

const blockers: Record<string, Blocker> = import.meta.glob("./*/index.ts", { eager: true, import: "default" });
const BlockerMap: Record<string, Blocker> = {};

for (const blocker of Object.values(blockers)) {
  BlockerMap[blocker.type] = blocker;
}

const getBlockerRender = (type: string) => {
  return BlockerMap[type].render;
};

export { BlockerMap, getBlockerRender };
