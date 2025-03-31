import { KeyedDataProvider } from './keyed-data-provider';
import { Message } from './message';

export class WebSocketDataProvider implements KeyedDataProvider {
  // Map each key to an array of subscriber callbacks.
  private subscribers: Record<string, Array<(data: unknown) => void>> = {};
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);

    this.ws.addEventListener('message', (event) => {
      try {
        // Parse the incoming message as Message<any>
        const msg: Message<any> = JSON.parse(event.data);
        const key = msg.name;
        if (this.subscribers[key]) {
          // Broadcast the parsed message to all subscribers for this key.
          this.subscribers[key].forEach((callback) => callback(msg));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
  }

  /**
   * Subscribe to updates for a given key.
   * The generic parameter T describes the expected type of msg.value.
   */
  subscribe<T>(key: string, callback: (data: Message<T>) => void): void {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
      // Send subscription request to the server.
      this.ws.send(JSON.stringify({ type: 'subscribe', name: key }));
    }
    this.subscribers[key].push(callback as (data: unknown) => void);
  }

  /**
   * Unsubscribe a callback from updates for a given key.
   */
  unsubscribe<T>(key: string, callback: (data: Message<T>) => void): void {
    if (!this.subscribers[key]) return;
    this.subscribers[key] = this.subscribers[key].filter(
      (cb) => cb !== (callback as (data: unknown) => void),
    );
    if (this.subscribers[key].length === 0) {
      // Send unsubscribe message if no more subscribers.
      this.ws.send(JSON.stringify({ type: 'unsubscribe', name: key }));
      delete this.subscribers[key];
    }
  }
}
