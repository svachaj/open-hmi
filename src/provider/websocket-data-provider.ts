import { KeyedDataProvider } from './keyed-data-provider';
import { Message } from './message';

export class WebSocketDataProvider implements KeyedDataProvider {
  private subscribers: Map<string, Array<(data: unknown) => void>> = new Map();
  private ws: WebSocket | null = null;
  private url: string | null = null;

  private reconnectInterval: number = 5000;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private connectionLostDate: Date | null = null;
  private lastReconnectDate: Date | null = null;

  onConnectionStateChange: (connected: boolean) => void = () => {};
  onReconnectionProgress: (
    attempt: number,
    lastAttempt: Date | null,
    nextAttemptInSeconds: number,
  ) => void = () => {};

  constructor(url: string) {
    this.url = url;
    this.establishConnection(false);
  }

  private establishConnection(resubscribe: boolean): void {
    if (!this.url) return;

    this.cleanUp();
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.connectionLostDate = null;
      this.lastReconnectDate = null;
      this.onConnectionStateChange(true);

      if (resubscribe) {
        this.subscribers.forEach((callbacks, key) => {
          this.send({ type: 'subscribe', pvs: [key] });
          callbacks.forEach((cb) => cb({ name: key, data: null }));
        });
      }
    };

    this.ws.onmessage = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data);
      const callbacks = this.subscribers.get(message.name);
      if (callbacks) {
        callbacks.forEach((cb) => cb(message));
      }
    };

    this.ws.onerror = () => {
      this.onConnectionStateChange(false);
      this.scheduleReconnect();
    };

    this.ws.onclose = () => {
      this.onConnectionStateChange(false);
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer !== null) return; // already scheduled

    this.connectionLostDate ??= new Date();
    this.lastReconnectDate = new Date();

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this.reconnectTimer = null;
      this.onReconnectionProgress(
        this.reconnectAttempts,
        this.lastReconnectDate,
        this.reconnectInterval / 1000,
      );
      this.establishConnection(true);
    }, this.reconnectInterval);
  }

  private cleanUp(): void {
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      if (
        this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING
      ) {
        this.ws.close();
      }
    }
    this.ws = null;
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.subscribers.forEach((callbacks, key) => {
      callbacks.forEach((cb) => cb({ name: key, data: null }));
    });
  }

  subscribe<T>(key: string, callback: (msg: Message<T>) => void): void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
      const sendSubscription = () => {
        // Before sending, double-check that the connection is open.
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: 'subscribe', pvs: [key] }));
        } else {
          console.warn(`WebSocket not open when trying to subscribe to ${key}`);
        }
        this.send({ type: 'subscribe', pvs: [key] });
      };

      if (this.ws?.readyState === WebSocket.OPEN) {
        sendSubscription();
      } else {
        // If the connection is not yet open, wait for the 'open' event.
        this.ws?.addEventListener('open', sendSubscription, { once: true });
      }
    }
    if (this.subscribers && this.subscribers.has(key) && callback)
      this.subscribers.get(key)?.push(callback as (data: unknown) => void);
  }

  unsubscribe<T>(key: string): void {
    if (!this.subscribers.has(key)) return;
    this.subscribers.delete(key);
  }

  send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('Cannot send message: WebSocket not open');
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  destroy(): void {
    this.cleanUp();
    this.subscribers.clear();
  }
}

export function createWsProvider(url: string): WebSocketDataProvider {
  return new WebSocketDataProvider(url);
}
