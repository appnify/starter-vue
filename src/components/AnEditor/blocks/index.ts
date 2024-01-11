import { InjectionKey } from 'vue';
import { Block, Blocker, Container } from '../core';
import { useTextBlock } from './text';

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

export const BlockerManagerKey = Symbol('k') as InjectionKey<ReturnType<typeof useBlockerManage>>

export function useBlockerManage() {
  const blockers: Blocker[] = [useTextBlock()];
  const leftPanels: any[] = [];

  for (const blocker of blockers) {
    const panel = blocker.addLeftTab?.();
    if (panel) {
      leftPanels.push(leftPanels);
    }
  }

  const callInitHook = (container: Container) => {
    for (const blocker of blockers) {
      container = blocker.onLoadContainer?.(container) || container;
    }
    return container;
  };

  const callLoadHook = (data: any): Blocker => {
    for (const blocker of blockers) {
      data = blocker.onLoadBlock?.(data) || data;
    }
    return data;
  };

  const callSaveHook = (block: Block) => {
    let data = block;
    for (const blocker of blockers) {
      data = blocker.onSaveBlock?.(data) || data;
    }
    return data;
  };

  return {
    blockers,
    leftPanels,
    callInitHook,
    callLoadHook,
    callSaveHook,
  };
}
