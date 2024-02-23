export function arraify<T>(data: T | T[]): T[] {
  if (!data) {
    return [];
  }
  return Array.isArray(data) ? data : [data];
}
