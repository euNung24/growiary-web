export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait?: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait || 200);
  };

  debounced.cancel = () => {
    if (timeout) {
      console.log('cancle', timeout);

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
