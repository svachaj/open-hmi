// src/providers/keyed-data-provider.ts
import { Message } from './message';

export interface KeyedDataProvider {
  subscribe<T>(key: string, callback: (msg: Message<T>) => void): void;
  unsubscribe<T>(key: string, callback: (msg: Message<T>) => void): void;
}
