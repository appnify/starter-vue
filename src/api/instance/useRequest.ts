/**
 * 请求函数
 * @see "src/api/instance/useRequest.ts"
 */
export function useRequest<T extends PromiseFn, E = unknown>(fn: T, options: Options<T> = {}) {
  type Data = Awaited<ReturnType<T>>;
  type Args = Parameters<T>;
  const { initialParams, initialData, retry = 0, retryDelay = 0, interval = 0 } = options;
  const { onBefore, onSuccess, onError, onFinally } = options;

  /**
   * 返回数据
   */
  const data = ref<Data | null>(initialData ?? null);
  /**
   * 请求错误
   */
  const error = ref<E | null>(null);
  /**
   * 是否请求中
   */
  const loading = ref(false);

  let isCanceled = false;
  let retryCount = 0;
  let retryTimer = 0;
  let interTimer = 0;
  let latestArgs = initialParams ?? [];

  const _send = async (...args: Args) => {
    try {
      onBefore?.(args);
      loading.value = true;
      const res = await fn(...args);
      retryCount = 0;
      if (isCanceled) {
        return [];
      }
      onSuccess?.(res);
      data.value = res;
      error.value = null;
    } catch (err: any) {
      if (isCanceled) {
        return [];
      }
      onError?.(err);
      data.value = null;
      error.value = err;
      if (retry > 0 && retryCount < retry) {
        retryCount++;
        retryTimer = setTimeout(() => _send(...args), retryDelay) as any;
      }
    } finally {
      loading.value = false;
      if (isCanceled) {
        return [];
      }
      onFinally?.();
      if (!retryCount && interval > 0) {
        interTimer = setTimeout(() => _send(...args), interval) as any;
      }
    }
    return [error.value, data.value];
  };

  const clearAllTimer = () => {
    clearTimeout(retryTimer);
    clearTimeout(interTimer);
  };

  /**
   * 取消请求
   */
  const cancel = () => {
    isCanceled = true;
    clearAllTimer();
  };

  /**
   * 发送请求
   */
  const send = (...args: Args) => {
    isCanceled = false;
    retryCount = 0;
    latestArgs = args;
    clearAllTimer();
    return _send(...args);
  };

  onMounted(() => initialParams && send(...initialParams));
  onUnmounted(cancel);

  return {
    data,
    error,
    loading,
    send,
    cancel,
  };
}

type PromiseFn = (...args: any[]) => Promise<any>;

interface Options<T extends PromiseFn = PromiseFn> {
  /**
   * 初始请求参数
   * @description 传递此参数会在挂载后立即执行
   */
  initialParams?: Parameters<T>;
  /**
   * 默认值
   * @description 与请求函数的返回值一致
   */
  initialData?: Awaited<ReturnType<T>>;
  /**
   * 是否显示全局的 loading
   * @default false
   */
  toast?: boolean | string;
  /**
   * 请求失败后重试的次数
   * @default 0
   */
  retry?: number;
  /**
   * 请求失败后重试的间隔(ms)
   * @default 0
   */
  retryDelay?: number;
  /**
   * 轮询间隔(ms)
   * @default 0
   */
  interval?: number;
  /**
   * 请求前的回调
   */
  onBefore?: (args: Parameters<T>) => void;
  /**
   * 请求成功回调
   */
  onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  /**
   * 请求失败回调
   */
  onError?: (error: unknown) => void;
  /**
   * 请求结束回调
   */
  onFinally?: () => void;
}
