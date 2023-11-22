import { env } from '@/config/env';
import { createWebHashHistory, createWebHistory } from 'vue-router';

/**
 * 模式映射
 */
const HistoryMap = {
  web: createWebHistory,
  hash: createWebHashHistory,
};

/**
 * 路由模式
 */
export function historyMode() {
  const mode = HistoryMap[env.historyMode];
  return mode();
}
