import { HmiCounter } from '..';

declare module 'vue' {
  export interface GlobalComponents {
    'hmi-counter': typeof HmiCounter;
    // Add more components as they are created
  }
}

export {};
