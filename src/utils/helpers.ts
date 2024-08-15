export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<void> {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): Promise<void> {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          await func(...args);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
