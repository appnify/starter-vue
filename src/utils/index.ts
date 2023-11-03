export * from "./delConfirm";

/**
 * 暂停一段时间
 * @param ms 时长(毫秒)
 * @returns 
 */
export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))