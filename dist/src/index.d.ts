/// <reference types="react" />
export { HmiCounter } from './components/hmi-counter';
export { HmiNavbar } from './components/navigation/hmi-navbar';
export { HmiPane } from './components/layout/hmi-pane';
export { HmiSidebar } from './components/layout/hmi-sidebar';
export { createWsProvider } from './provider/websocket-data-provider';
export default function HmiComponents(): null;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
            'hmi-pane': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
            'hmi-navbar': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
            'hmi-sidebar': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
        }
    }
}
//# sourceMappingURL=index.d.ts.map