export interface Message<T = any> {
  type: string;
  name: string;
  value: T;
  severity: number;
  timestamp: number;
  ok: boolean;
}
