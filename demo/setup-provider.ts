// demo/setup-provider.ts
import { createWsProvider } from '../src/provider/websocket-data-provider';

// Create a provider with your custom WebSocket URL.
// (You can also retrieve this URL from a configuration file or environment variable.)
const provider = createWsProvider(
  'ws://127.0.0.1:8080/ws/pvs?dummyToken=i_love_laser',
);

// Inject the provider globally so that any component that looks for it automatically can find it.
(window as any).__GLOBAL_DATA_PROVIDER__ = provider;
