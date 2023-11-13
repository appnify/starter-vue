export function strOrFnRender(fn: any, options: any) {
  if (typeof fn === "string") {
    return () => fn;
  }
  if (typeof fn === "function") {
    return fn(options);
  }
  return null;
}
