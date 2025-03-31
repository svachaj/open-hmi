export interface KeyedDataProvider<T = any> {
  /**
   * Subscribe to updates for a specific key.
   */
  subscribe(key: string, callback: (data: T) => void): void;

  /**
   * Unsubscribe from updates for a specific key.
   */
  unsubscribe(key: string, callback: (data: T) => void): void;
}
