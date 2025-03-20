// This file exists to provide a JavaScript module for the "open-hmi/vue" import
// It re-exports everything from the main module

export * from './index';
export { default } from './index';

// Vue type augmentation
declare module 'vue' {
  export interface GlobalComponents {
    'hmi-counter': any;
  }
}
