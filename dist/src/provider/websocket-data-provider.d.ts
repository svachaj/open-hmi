import { KeyedDataProvider } from './keyed-data-provider';
import { Message } from './message';
export declare class WebSocketDataProvider implements KeyedDataProvider {
    private subscribers;
    private ws;
    constructor(url: string);
    /**
     * Subscribe to updates for a given key.
     * The generic parameter T describes the expected type of msg.value.
     */
    subscribe<T>(key: string, callback: (msg: Message<T>) => void): void;
    /**
     * Unsubscribe a callback from updates for a given key.
     */
    unsubscribe<T>(key: string, callback: (data: Message<T>) => void): void;
}
export declare function createWsProvider(url: string): WebSocketDataProvider;
//# sourceMappingURL=websocket-data-provider.d.ts.map