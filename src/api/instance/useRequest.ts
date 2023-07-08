type PromiseFn = (...args: any[]) => Promise<any>;

type Options<T extends PromiseFn = PromiseFn> = {
  /**
   * 是否显示全局的 loading
   */
  toast?: boolean | string;
  /**
   * 是否立即执行
   */
  initialParams?: boolean | Parameters<T>;
  /**
   * 默认值
   */
  initialData?: Partial<Awaited<ReturnType<T>>>;
  /**
   * 请求失败后重试的次数
   */
  retry?: number;
  /**
   * 请求失败后重试的间隔(ms)
   */
  retryDelay?: number;
  /**
   * 轮询间隔(ms)
   */
  interval?: number;
  /**
   * 请求前回调
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
};

type State<T extends PromiseFn = PromiseFn, D = Awaited<ReturnType<T>>> = {
  /**
   * 请求返回的数据
   */
  data: D | undefined;
  /**
   * 请求返回的错误
   */
  error: unknown;
  /**
   * 请求是否中
   */
  loading: boolean;
  /**
   * 发送请求
   */
  send: (...args: Parameters<T>) => Promise<[unknown, undefined] | [undefined, D]>;
  /**
   * 取消请求
   */
  cancel: () => void;
};

const log = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

/**
 * 包装请求函数，返回响应式状态和请求方法
 * @see src/api/instance/useRequest.ts
 */
export function useRequest<T extends PromiseFn>(fn: T, options: Options<T> = {}) {
  const {
    initialParams,
    retry,
    retryDelay = 0,
    interval,
    initialData,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const state = reactive<State<T>>({
    data: initialData,
    error: null,
    loading: false,
    send: null,
    cancel: null,
  } as any);

  const inner = {
    canceled: false,
    retryCount: 0,
    retryTimer: 0 as any,
    intervalTimer: 0 as any,
    latestParams: (initialParams || []) as any,
    clearAllTimer: () => {
      inner.retryTimer && clearTimeout(inner.retryTimer);
      inner.intervalTimer && clearTimeout(inner.intervalTimer);
    },
  };

  const _send: any = async (...args: Parameters<T>) => {
    let data;
    let error;
    inner.retryCount && log(`retry: ${inner.retryCount}`);
    try {
      state.loading = true;
      onBefore?.(args);
      const res = await fn(...args);
      inner.retryCount = 0;
      if (!inner.canceled) {
        onSuccess?.(res.data);
        data = res.data;
      }
    } catch (err) {
      if (!inner.canceled) {
        error = err;
        onError?.(err);
        if (retry && retry > 0 && inner.retryCount < retry) {
          inner.retryCount++;
          inner.retryTimer = setTimeout(() => {
            _send(...args);
          }, retryDelay);
        }
      }
    } finally {
      log("finally");
      state.loading = false;
      state.error = error;
      if (!error) {
        state.data = data;
      }
      if (!inner.canceled) {
        onFinally?.();
        if (!inner.retryCount && interval && interval > 0) {
          inner.intervalTimer = setTimeout(() => {
            _send(...args);
          }, interval);
        }
      }
    }
    return [error, data];
  };

  state.cancel = () => {
    inner.canceled = true;
    inner.clearAllTimer();
  };

  state.send = (...args: Parameters<T>) => {
    inner.canceled = false;
    inner.retryCount = 0;
    inner.latestParams = args;
    inner.clearAllTimer();
    return _send(...args);
  };

  onMounted(() => {
    if (initialParams) {
      state.send(...(Array.isArray(initialParams) ? initialParams : ([] as any)));
    }
  });

  onUnmounted(() => {
    state.cancel();
  });

  return state;
}
