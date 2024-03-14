import { InjectionKey } from 'vue';
import { Block, Blocker, Container } from '../core';

const blockers: Record<string, Blocker> = import.meta.glob(['./*/index.ts', '!./font/*'], {
  eager: true,
  import: 'default',
});
const BlockerMap: Record<string, Blocker> = {};

for (const blocker of Object.values(blockers)) {
  BlockerMap[blocker.type] = blocker;
}

const getBlockerRender = (type: string) => {
  return BlockerMap[type].render;
};

const getTypeName = (type: string) => {
  return BlockerMap[type].title;
};

const getIcon = (type: string) => {
  return BlockerMap[type].icon;
};

export { BlockerMap, getBlockerRender, getIcon, getTypeName };
