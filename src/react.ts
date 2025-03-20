// This file exists to provide a JavaScript module for the "open-hmi/react" import
// It re-exports everything from the main module

export * from './index';
export { default } from './index';

// Re-declare JSX types for React
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
    }
  }
}
