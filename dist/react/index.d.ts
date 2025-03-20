import { HmiCounter } from '..';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<HmiCounter>, HmiCounter>;
      // Add more components as they are created
    }
  }
}

export {};
