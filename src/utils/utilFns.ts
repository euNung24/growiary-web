export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait?: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait || 200);
  };
}
